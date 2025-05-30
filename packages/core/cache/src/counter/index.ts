

/**
 * @experimental
 * atomic counter
 */
export interface Counter {
  get(key: string): Promise<number>;
  incr(key: string): Promise<number>;
  incr(key: string, ttl: number): Promise<number>;
  incrby(key: string, val: number): Promise<number>;
  incrby(key: string, val: number, ttl: number): Promise<number>;
  reset(key: string): Promise<void>;
}

export { MemoryCounter } from './memory-counter';
export { RedisCounter } from './redis-counter';
export { LockCounter } from './lock-counter';
