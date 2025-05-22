/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import { iconChecker, IconCheckOptions } from './icon';
import { radioChecker, RadioCheckOptions } from './radio';
import { inputChecker, InputCheckOptions } from './input';
import { numberChecker, NumberCheckOptions } from './number';
import { textareaChecker, TextareaCheckOptions } from './textarea';
import { CollectionFieldCheckOptions, collectionFieldChecker } from './collectionField';

export * from './icon';
export * from './radio';
export * from './icon';

export type FormItemCheckOptions =
  | ({ type: 'icon' } & IconCheckOptions)
  | ({ type: 'radio' } & RadioCheckOptions)
  | ({ type: 'collectionField' } & CollectionFieldCheckOptions)
  | ({ type: 'input' } & InputCheckOptions)
  | ({ type: 'number' } & NumberCheckOptions)
  | ({ type: 'textarea' } & TextareaCheckOptions);

const checkers = {
  icon: iconChecker,
  radio: radioChecker,
  input: inputChecker,
  collectionField: collectionFieldChecker,
  number: numberChecker,
  textarea: textareaChecker,
};

export async function checkFormItems(list: FormItemCheckOptions[]) {
  for (const item of list) {
    const type = item.type;
    const checker = checkers[type];
    await checker(item as any);
  }
}
