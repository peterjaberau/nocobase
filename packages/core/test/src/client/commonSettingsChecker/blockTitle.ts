/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import { waitFor, screen } from '@testing-library/react';
import { checkSettings } from '../settingsChecker';
import { expectNoTsError } from '../utils';

export async function checkBlockTitle(oldValue?: string) {
  const newValue = 'new test';
  await checkSettings([
    {
      type: 'modal',
      title: 'Edit block title',
      modalChecker: {
        modalTitle: 'Edit block title',
        formItems: [
          {
            type: 'input',
            label: 'Block title',
            oldValue,
            newValue,
          },
        ],
        async afterSubmit() {
          await waitFor(() => {
            expectNoTsError(screen.queryByText(newValue)).toBeInTheDocument();
          });
        },
      },
    },
  ]);
}
