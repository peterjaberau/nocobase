/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import { expectNoTsError } from '../utils';

export interface CommonFormItemCheckerOptions {
  label?: string;
  container?: HTMLElement;
  newValue?: any;
  oldValue?: any;
  Component?: string;
}

export interface GetFormItemElementOptions {
  container?: HTMLElement;
  Component: string;
  label?: string;
}

export function getFormItemElement({ container = document.body, Component, label }: GetFormItemElementOptions) {
  const preSelector = `div[aria-label^="block-item-${Component}-"]`;
  const selector = label ? `${preSelector}[aria-label$="${label}"]` : preSelector;
  const formItem = container.querySelector(selector);
  expectNoTsError(formItem).toBeInTheDocument();

  return formItem;
}
