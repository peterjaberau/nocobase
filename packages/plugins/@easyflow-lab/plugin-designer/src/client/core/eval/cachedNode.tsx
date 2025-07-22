import { FunctionNode, withFunction } from './functionNode';
import { AbstractNode, Node } from './node';
import { RecordNode } from './recordNode';
import { EvalMethods } from './types/evalTypes';
import { areExposingNodesEqual } from './utils/areExposingNodesEqual';

interface CachedValue<T> {
  value: T;
  isCached: boolean;
}

export class CachedNode<T> extends AbstractNode<CachedValue<T>> {
  type: string = 'cached';
  child: AbstractNode<T>;
  private filterNodesCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<T>['filterNodes']>;
  } | null = null;

  constructor(child: AbstractNode<T>) {
    super();
    this.child = withEvalCache(child);
  }

  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    if (this.filterNodesCache && areExposingNodesEqual(this.filterNodesCache.exposingNodes, exposingNodes)) {
      return this.filterNodesCache.result;
    }

    const result = this.child.filterNodes(exposingNodes);
    this.filterNodesCache = { exposingNodes, result };
    return result;
  }

  override justEval(exposingNodes: Record<string, Node<unknown>>, methods?: EvalMethods): CachedValue<T> {
    const isCached = this.child.isHitEvalCache(exposingNodes);
    const value = this.child.evaluate(exposingNodes, methods);
    return { value, isCached };
  }

  override getChildren(): Node<unknown>[] {
    return [this.child];
  }

  override dependValues(): Record<string, unknown> {
    return this.child.dependValues();
  }

  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    return this.child.fetchInfo(exposingNodes);
  }
}

function withEvalCache<T>(node: AbstractNode<T>): FunctionNode<T, T> {
  const newNode = withFunction(node, (x) => x);
  newNode.evalCache = { ...node.evalCache };
  return newNode;
}

export function evalNodeOrMinor<T>(mainNode: AbstractNode<T>, minorNode: Node<T>): Node<T> {
  const nodeRecord = { main: new CachedNode(mainNode), minor: minorNode };
  return new FunctionNode(new RecordNode(nodeRecord), (record) => {
    const mainCachedValue = record.main;
    if (!mainCachedValue.isCached) {
      return mainCachedValue.value;
    }
    return record.minor;
  });
}
