import { LRUCache } from 'lru-cache';
import { AbstractNode, Node } from './node';
import { evalPerfUtil } from './utils/perfUtils';
import { areExposingNodesEqual } from './utils/areExposingNodesEqual';

export class SimpleNode<T> extends AbstractNode<T> {
  readonly type = 'simple';
  private filterNodesCache: {
    exposingNodes: Record<string, Node<unknown>>;
    result: ReturnType<Node<T>['filterNodes']>;
  } | null = null;

  constructor(readonly value: T) {
    super();
  }

  override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
    if (this.filterNodesCache && areExposingNodesEqual(this.filterNodesCache.exposingNodes, exposingNodes)) {
      return this.filterNodesCache.result;
    }

    const result = evalPerfUtil.perf(this, 'filterNodes', () => {
      return new Map<Node<unknown>, Set<string>>();
    });

    this.filterNodesCache = { exposingNodes, result };
    return result;
  }

  override justEval(exposingNodes: Record<string, Node<unknown>>): T {
    return this.value;
  }

  override getChildren(): Node<unknown>[] {
    return [];
  }

  override dependValues(): Record<string, unknown> {
    return {};
  }

  override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
    return {
      isFetching: false,
      ready: true,
    };
  }
}

export function fromValue<T>(value: T) {
  return new SimpleNode(value);
}

const lru = new LRUCache<unknown, SimpleNode<unknown>>({ max: 16384 });

export function fromValueWithCache<T>(value: T): SimpleNode<T> {
  let res = lru.get(value);
  if (res === undefined) {
    res = fromValue(value);
    lru.set(value, res);
  }
  return res as SimpleNode<T>;
}

// /**
//  * directly provide data
//  */
// export class SimpleNode<T> extends AbstractNode<T> {
//   readonly type = "simple";
//   constructor(readonly value: T) {
//     super();
//   }
//   @memoized()
//   override filterNodes(exposingNodes: Record<string, Node<unknown>>) {
//     return evalPerfUtil.perf(this, "filterNodes", () => {
//       return new Map<Node<unknown>, Set<string>>();
//     });
//   }
//   override justEval(exposingNodes: Record<string, Node<unknown>>): T {
//     return this.value;
//   }
//   override getChildren(): Node<unknown>[] {
//     return [];
//   }
//   override dependValues(): Record<string, unknown> {
//     return {};
//   }
//   override fetchInfo(exposingNodes: Record<string, Node<unknown>>) {
//     return {
//       isFetching: false,
//       ready: true,
//     };
//   }
// }
//
// /**
//  * provide simple value, don't need to eval
//  */
// export function fromValue<T>(value: T) {
//   return new SimpleNode(value);
// }
//
// const lru = new LRU<unknown, SimpleNode<unknown>>({ max: 16384 });
// export function fromValueWithCache<T>(value: T): SimpleNode<T> {
//   let res = lru.get(value);
//   if (res === undefined) {
//     res = fromValue(value);
//     lru.set(value, res);
//   }
//   return res as SimpleNode<T>;
// }
