import { collections } from '../db';

export const getCollection = (collectionId: any) => {
  return collections[collectionId] || [];
};
