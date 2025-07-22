import _ from 'lodash';
import { AbstractNode, FetchInfoOptions, Node, NodeToValue } from './node';
import { EvalMethods } from './types/evalTypes';
import { addDepends } from './utils/dependMap';
import { evalPerfUtil } from './utils/perfUtils';
import { areExposingNodesEqual } from './utils/areExposingNodesEqual';

export type RecordNodeToValue<T> = { [K in keyof T]: NodeToValue<T[K]> };

export class RecordNode<T extends Record<string, Node<unknown>>> extends AbstractNode<RecordNodeToValue<T>> {
  readonly type = 'record';
  private filterNodesCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<RecordNodeToValue<T>>['filterNodes']>;
  } | null = null;

  private fetchInfoCache: {
    exposingNodes: Record<string, Node<unknown>>;
    options?: FetchInfoOptions;
    result: ReturnType<Node<RecordNodeToValue<T>>['fetchInfo']>;
  } | null = null;

  constructor(readonly children: T) {
    super();
  }

  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    if (this.filterNodesCache && areExposingNodesEqual(this.filterNodesCache.exposingNodes, exposingNodes)) {
      return this.filterNodesCache.result;
    }

    const result = evalPerfUtil.perf(this, 'filterNodes', () => {
      const result = new Map<Node<unknown>, Set<string>>();
      Object.values(this.children).forEach((node) => {
        addDepends(result, node.filterNodes(exposingNodes));
      });
      return result;
    });

    this.filterNodesCache = { exposingNodes, result };
    return result;
  }

  override justEval(exposingNodes: Record<string, Node<unknown>>, methods?: EvalMethods): RecordNodeToValue<T> {
    return _.mapValues(this.children, (v, key) =>
      evalPerfUtil.perf(this, `eval-${key}`, () => v.evaluate(exposingNodes, methods)),
    ) as RecordNodeToValue<T>;
  }

  override getChildren(): Node<unknown>[] {
    return Object.values(this.children);
  }

  override dependValues(): Record<string, unknown> {
    const nodes = Object.values(this.children);
    if (nodes.length === 1) {
      return nodes[0].dependValues();
    }
    const ret: Record<string, unknown> = {};
    nodes.forEach((node) => {
      Object.entries(node.dependValues()).forEach(([key, value]) => {
        ret[key] = value;
      });
    });
    return ret;
  }

  override fetchInfo(exposingNodes: Record<string, Node<unknown>>, options?: FetchInfoOptions) {
    if (
      this.fetchInfoCache &&
      areExposingNodesEqual(this.fetchInfoCache.exposingNodes, exposingNodes) &&
      _.isEqual(this.fetchInfoCache.options, options)
    ) {
      return this.fetchInfoCache.result;
    }

    let isFetching = false;
    let ready = true;
    Object.entries(this.children).forEach(([name, child]) => {
      const fi = child.fetchInfo(exposingNodes, options);
      isFetching = fi.isFetching || isFetching;
      ready = fi.ready && ready;
    });

    const result = { isFetching, ready };
    this.fetchInfoCache = { exposingNodes, options, result };
    return result;
  }
}

export function fromRecord<T extends Record<string, Node<unknown>>>(record: T) {
  return new RecordNode(record);
}
