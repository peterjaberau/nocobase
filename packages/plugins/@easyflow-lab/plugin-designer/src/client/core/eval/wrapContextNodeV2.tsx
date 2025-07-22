import { AbstractNode, Node } from './node';
import { EvalMethods } from './types/evalTypes';
import { areExposingNodesEqual } from './utils/areExposingNodesEqual';

export class WrapContextNodeV2<T> extends AbstractNode<T> {
  readonly type = 'wrapContextV2';
  private filterNodesCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<T>['filterNodes']>;
  } | null = null;

  private wrapCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: Record<string, Node<unknown>>;
  } | null = null;

  constructor(
    readonly child: Node<T>,
    readonly paramNodes: Record<string, Node<unknown>>,
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

  override justEval(exposingNodes: Record<string, Node<unknown>>, methods?: EvalMethods): T {
    return this.child.evaluate(this.wrap(exposingNodes), methods);
  }

  override getChildren(): Node<unknown>[] {
    return [this.child];
  }

  override dependValues(): Record<string, unknown> {
    return this.child.dependValues();
  }

  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    return this.child.fetchInfo(this.wrap(exposingNodes));
  }

  private wrap(exposingNodes: Record<string, Node<unknown>>) {
    if (this.wrapCache && areExposingNodesEqual(this.wrapCache.exposingNodes, exposingNodes)) {
      return this.wrapCache.result;
    }

    const result = { ...exposingNodes, ...this.paramNodes };
    this.wrapCache = { exposingNodes, result };
    return result;
  }
}
