/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expectNoTsError } from '../utils';

export interface SelectSettingOptions {
  title: string;
  beforeSelect?: () => Promise<void> | void;
  oldValue?: string;
  options?: { label: string; checker?: () => void | Promise<void> }[];
}

export async function checkSelectSetting(options: SelectSettingOptions) {
  if (options.beforeSelect) {
    await options.beforeSelect();
  }

  const formItem = screen.getByTitle(options.title);

  if (options.oldValue) {
    expectNoTsError(formItem).toHaveTextContent(options.oldValue);
  }

  if (options.options) {
    const getListbox = () => document.querySelector(`.select-popup-${options.title.replaceAll(' ', '-')}`);

    // 打开下拉框
    expectNoTsError(formItem.querySelector('.ant-select-selector')).toBeInTheDocument();
    await userEvent.click(formItem.querySelector('.ant-select-selector'));
    await waitFor(() => {
      expectNoTsError(getListbox()).toBeInTheDocument();
    });

    for (const option of options.options) {
      const listbox = getListbox();
      expectNoTsError(listbox).toHaveTextContent(option.label);

      if (option.checker) {
        const item = [...listbox.querySelectorAll('.ant-select-item-option-content')].find(
          (item) => item.textContent === option.label,
        );
        await userEvent.click(item);

        // 等到下拉框关闭，并且值更新
        await waitFor(() => {
          expectNoTsError(screen.getByTitle(options.title)).toHaveTextContent(option.label);
        });

        await option.checker();

        // 重新打开下拉框
        await userEvent.click(screen.getByTitle(options.title).querySelector('.ant-select-selection-item'));
        await waitFor(() => {
          expectNoTsError(getListbox()).toBeInTheDocument();
        });
      }
    }
  }
}
