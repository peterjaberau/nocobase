/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import userEvent from '@testing-library/user-event';

import { CommonFormItemCheckerOptions, getFormItemElement } from './common';
import { expectNoTsError } from '../utils';

export type NumberCheckOptions = CommonFormItemCheckerOptions;

export async function numberChecker(options: NumberCheckOptions) {
  const formItem = getFormItemElement({ Component: 'InputNumber', ...options });

  const input = formItem.querySelector('input');

  if (options.oldValue) {
    expectNoTsError(input).toHaveValue(options.oldValue);
  }

  if (options.newValue) {
    await userEvent.clear(input);
    await userEvent.type(input, String(options.newValue));
  }
}
