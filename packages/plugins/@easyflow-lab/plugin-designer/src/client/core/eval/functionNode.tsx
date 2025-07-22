import { memoized } from '../util/memoize';
import { AbstractNode, FetchInfoOptions, Node } from './node';
import { EvalMethods } from './types/evalTypes';
import { evalPerfUtil } from './utils/perfUtils';
import { areExposingNodesEqual } from './utils/areExposingNodesEqual';

export class FunctionNode<T, OutputType> extends AbstractNode<OutputType> {
  readonly type = 'function';
  private filterNodesCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<T>['filterNodes']>;
  } | null = null;

  private fetchInfoCache: {
    exposingNodes: Record<string, Node<unknown>>;
    options?: FetchInfoOptions;
    result: ReturnType<Node<T>['fetchInfo']>;
  } | null = null;

  constructor(
    readonly child: Node<T>,
    readonly func: (params: T) => OutputType,
  ) {
    super();
  }

  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    if (this.filterNodesCache && areExposingNodesEqual(this.filterNodesCache.exposingNodes, exposingNodes)) {
      return this.filterNodesCache.result;
    }

    const result = evalPerfUtil.perf(this, 'filterNodes', () => {
      return this.child.filterNodes(exposingNodes);
    });

    this.filterNodesCache = { exposingNodes, result };
    return result;
  }

  override justEval(exposingNodes: Record<string, Node<unknown>>, methods?: EvalMethods): OutputType {
    return this.func(this.child.evaluate(exposingNodes, methods));
  }

  override getChildren(): Node<unknown>[] {
    return [this.child];
  }

  override dependValues(): Record<string, unknown> {
    return this.child.dependValues();
  }

  override fetchInfo(exposingNodes: Record<string, Node<unknown>>, options?: FetchInfoOptions) {
    if (
      this.fetchInfoCache &&
      areExposingNodesEqual(this.fetchInfoCache.exposingNodes, exposingNodes) &&
      this.fetchInfoCache.options === options
    ) {
      return this.fetchInfoCache.result;
    }

    const result = this.child.fetchInfo(exposingNodes, options);
    this.fetchInfoCache = { exposingNodes, options, result };
    return result;
  }
}

export function withFunction<T, OutputType>(child: Node<T>, func: (params: T) => OutputType) {
  return new FunctionNode(child, func);
}
