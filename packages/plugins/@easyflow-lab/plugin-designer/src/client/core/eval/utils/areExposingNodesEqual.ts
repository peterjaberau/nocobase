import { Node } from '../node';

/**
 * Compares two exposing nodes objects for equality
 */
export function areExposingNodesEqual(a: Record<string, Node<unknown>>, b: Record<string, Node<unknown>>): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  if (aKeys.length !== bKeys.length) {
    return false;
  }

  return aKeys.every((key) => a[key] === b[key]);
}
