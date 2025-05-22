/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import { fireEvent, screen, waitFor } from '@testing-library/react';
import { GetAppComponentOptions } from '../web';
import { renderAppOptions, renderReadPrettyApp } from './renderAppOptions';
import { expectNoTsError } from './utils';

export async function showSettingsMenu(container: HTMLElement | Document = document) {
  await waitFor(() => {
    return expectNoTsError(container.querySelector('[aria-label^="designer-schema-settings-"]')).toBeInTheDocument();
  });

  const button = await waitFor(() => {
    return container.querySelector('[aria-label^="designer-schema-settings-"]');
  });

  fireEvent.mouseEnter(button);
  fireEvent.mouseOver(button);

  await waitFor(() => {
    return expectNoTsError(screen.queryByTestId('schema-settings-menu')).toBeInTheDocument();
  });
}

export interface RenderSettingsOptions extends GetAppComponentOptions {
  container?: () => HTMLElement;
}
export const renderSettings = async (options: RenderSettingsOptions = {}) => {
  const { container = () => document, ...appOptions } = options;
  const result = await renderAppOptions({ ...appOptions, designable: true });

  const containerElement = container();

  await showSettingsMenu(containerElement);

  return result;
};

export const renderReadPrettySettings = async (options: RenderSettingsOptions = {}) => {
  const { container = () => document, ...appOptions } = options;
  const result = await renderReadPrettyApp({ ...appOptions, designable: true });

  const containerElement = container();

  await showSettingsMenu(containerElement);

  return result;
};
