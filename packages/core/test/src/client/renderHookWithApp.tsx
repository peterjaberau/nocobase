/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import React, { FC, Fragment } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { GetAppOptions, getApp } from '../web';
import { WaitApp } from './utils';

interface RenderHookOptions extends Omit<GetAppOptions, 'value' | 'onChange'> {
  hook: () => any;
  props?: any;
  Wrapper?: FC<{ children: React.ReactNode }>;
}

export const renderHookWithApp = async (options: RenderHookOptions) => {
  const { hook: useHook, props, Wrapper = Fragment, ...otherOptions } = options;
  const { App } = getApp(otherOptions);
  const WrapperValue: FC<{ children: React.ReactNode }> = ({ children }) => (
    <App>
      <Wrapper>{children}</Wrapper>
    </App>
  );

  const res = renderHook(() => useHook(), { wrapper: WrapperValue, initialProps: props });

  await WaitApp();

  return res;
};
