import { AbstractNode, FetchInfo, FetchInfoOptions, Node } from './node';
import { areExposingNodesEqual } from './utils/areExposingNodesEqual';

export class FetchCheckNode extends AbstractNode<FetchInfo> {
  readonly type = 'fetchCheck';
  private filterNodesCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<unknown>['filterNodes']>;
  } | null = null;

  private fetchInfoCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<unknown>['fetchInfo']>;
  } | null = null;

  constructor(
    readonly child: Node<unknown>,
    readonly options?: FetchInfoOptions,
  ) {
    super();
  }

  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    if (this.filterNodesCache && areExposingNodesEqual(this.filterNodesCache.exposingNodes, exposingNodes)) {
      return this.filterNodesCache.result;
    }

    const result = this.child.filterNodes(exposingNodes);
    this.filterNodesCache = { exposingNodes, result };
    return result;
  }

  override justEval(exposingNodes: Record<string, Node<unknown>>) {
    return this.fetchInfo(exposingNodes);
  }

  override getChildren(): Node<unknown>[] {
    return [this.child];
  }

  override dependValues(): Record<string, unknown> {
    return this.child.dependValues();
  }

  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    if (this.fetchInfoCache && areExposingNodesEqual(this.fetchInfoCache.exposingNodes, exposingNodes)) {
      return this.fetchInfoCache.result;
    }

    const result = this.child.fetchInfo(exposingNodes, this.options);
    this.fetchInfoCache = { exposingNodes, result };
    return result;
  }
}

export function isFetching(node: Node<unknown>): Node<FetchInfo> {
  return new FetchCheckNode(node);
}
