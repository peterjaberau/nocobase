import log from 'loglevel';

export const CACHE_PREFIX = '__cache__';
export function memo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const cachePropertyKey = CACHE_PREFIX + propertyKey;
  descriptor.value = function (...args: any[]) {
    const thisObj = this as any;
    if (!thisObj[cachePropertyKey]) {
      // put the result into array, for representing `undefined`
      thisObj[cachePropertyKey] = [originalMethod.apply(this, args)];
    }
    return thisObj[cachePropertyKey][0];
  };
}

export const profilerCallback = (
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
) => {
  if (actualDuration > 20) {
    log.warn(id, phase, actualDuration, baseDuration, startTime, commitTime);
  }
};
