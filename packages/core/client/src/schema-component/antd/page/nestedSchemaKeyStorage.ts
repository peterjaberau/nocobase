

import { uid } from '@formily/shared';

const randomNestedSchemaKeyStorage: Record<string, string> = {};

export const getRandomNestedSchemaKey = (popupUid: string) => {
  return randomNestedSchemaKeyStorage[popupUid] || (randomNestedSchemaKeyStorage[popupUid] = uid());
};

export const deleteRandomNestedSchemaKey = (popupUid: string) => {
  return delete randomNestedSchemaKeyStorage[popupUid];
};
