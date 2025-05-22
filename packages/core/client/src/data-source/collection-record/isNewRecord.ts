

import { untracked } from '@formily/reactive';
import { isObject } from 'lodash';

const key = '__isNewRecord__';

/**
 * 判断一个记录对象是否是新记录，可通过 markRecordAsNew 标记
 * @param record
 * @returns
 */
export const isNewRecord = (record: object) => {
  return untracked(() => !!record?.[key]);
};

/**
 * 将一个记录对象标记为新记录，可通过 isNewRecord 判断
 * @param record
 * @returns
 */
export const markRecordAsNew = (record: object) => {
  if (!isObject(record)) throw new Error('markRecordAsNew: record must be an object');

  record[key] = true;
  return record;
};
