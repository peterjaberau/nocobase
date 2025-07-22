import { EvalMethods } from './types/evalTypes';
import { AbstractNode, Node } from './node';
import { areExposingNodesEqual } from './utils/areExposingNodesEqual';

export class WrapNode<T> extends AbstractNode<T> {
  readonly type = 'wrap';
  private filterNodesCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<T>['filterNodes']>;
  } | null = null;

  private fetchInfoCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<T>['fetchInfo']>;
  } | null = null;

  constructor(
    readonly delegate: Node<T>,
    readonly moduleExposingNodes: Record<string, Node<unknown>>,
    readonly moduleExposingMethods?: EvalMethods,
    readonly inputNodes?: Record<string, Node<unknown> | string>,
  ) {
    super();
  }

  private wrap(exposingNodes: Record<string, Node<unknown>>, exposingMethods: EvalMethods) {
    if (!this.inputNodes) {
      return this.moduleExposingNodes;
    }

    const inputNodeEntries = Object.entries(this.inputNodes);
    if (inputNodeEntries.length === 0) {
      return this.moduleExposingNodes;
    }

    const inputNodes: Record<string, Node<unknown>> = {};
    inputNodeEntries.forEach(([name, node]) => {
      const targetNode: Node<unknown> = typeof node === 'string' ? exposingNodes[node] : node;
      if (!targetNode) {
        return;
      }
      inputNodes[name] = new WrapNode(targetNode, exposingNodes, exposingMethods);
    });

    return {
      ...this.moduleExposingNodes,
      ...inputNodes,
    };
  }

  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    if (this.filterNodesCache && areExposingNodesEqual(this.filterNodesCache.exposingNodes, exposingNodes)) {
      return this.filterNodesCache.result;
    }

    const result = this.delegate.filterNodes(this.wrap(exposingNodes, {}));
    this.filterNodesCache = { exposingNodes, result };
    return result;
  }

  override justEval(exposingNodes: Record<string, Node<unknown>>, methods: EvalMethods): T {
    return this.delegate.evaluate(this.wrap(exposingNodes, methods), this.moduleExposingMethods);
  }

  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    if (this.fetchInfoCache && areExposingNodesEqual(this.fetchInfoCache.exposingNodes, exposingNodes)) {
      return this.fetchInfoCache.result;
    }

    const result = this.delegate.fetchInfo(this.wrap(exposingNodes, {}));
    this.fetchInfoCache = { exposingNodes, result };
    return result;
  }

  override getChildren(): Node<unknown>[] {
    return [this.delegate];
  }

  override dependValues(): Record<string, unknown> {
    return {};
  }
}
