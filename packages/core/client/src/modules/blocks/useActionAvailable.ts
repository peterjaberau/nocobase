

import { useCollection } from '../../data-source';

export const useActionAvailable = (actionKey) => {
  const collection = useCollection() || ({} as any);
  const { unavailableActions, availableActions } = collection?.options || {};
  if (availableActions) {
    return availableActions?.includes?.(actionKey);
  }
  if (unavailableActions) {
    return !unavailableActions?.includes?.(actionKey);
  }
  return true;
};
