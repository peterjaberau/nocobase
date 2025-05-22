

import { Collection } from '../../../data-source';

export function getUniqueKeyFromCollection(collection: Collection) {
  if (collection?.filterTargetKey) {
    if (Array.isArray(collection.filterTargetKey)) {
      return collection?.filterTargetKey?.[0];
    }
    return collection?.filterTargetKey;
  }
  return collection?.getPrimaryKey() || 'id';
}
