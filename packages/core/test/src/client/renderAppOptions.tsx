/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import React from 'react';
import { render } from '.';
import { GetAppComponentOptions, addXReadPrettyToEachLayer, getAppComponent } from '../web';
import { WaitApp } from './utils';

export const renderAppOptions = async (options: GetAppComponentOptions) => {
  const App = getAppComponent(options);

  const res = render(<App />);

  await WaitApp();

  return res;
};

export const renderReadPrettyApp = (options: GetAppComponentOptions) => {
  return renderAppOptions({ ...options, schema: addXReadPrettyToEachLayer(options.schema) });
};
