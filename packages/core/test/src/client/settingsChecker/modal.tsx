/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import { CheckModalOptions, checkModal } from '../utils';

export interface CheckModalSettingOptions {
  title: string;
  beforeClick?: () => Promise<void> | void;
  afterClick?: () => Promise<void> | void;
  modalChecker?: Omit<CheckModalOptions, 'triggerText'>;
}

export async function checkModalSetting(options: CheckModalSettingOptions) {
  if (options.modalChecker) {
    await checkModal({
      triggerText: options.title,
      ...options.modalChecker,
    });
  }

  if (options.afterClick) {
    await options.afterClick();
  }
}
