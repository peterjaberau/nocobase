

import { Spin } from 'antd';
import React, { useCallback } from 'react';
import { useApp } from './useApp';

export const useAppSpin = () => {
  const app = useApp();
  const renderSpin = useCallback(
    () => (app?.renderComponent ? app?.renderComponent?.('AppSpin') : React.createElement(Spin)),
    [app],
  );
  return {
    render: renderSpin,
  };
};
