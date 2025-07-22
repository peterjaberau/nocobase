import { createContext, FC, ReactNode, useContext, useState, useEffect, useMemo } from 'react';
import { Spin } from 'antd';

import { dataAppState, dataServices, dataPresets } from './dataset';
import { useRequest } from '@easyflow/client';

const ContentContext = createContext<any>({});

const mockContentRequest = () =>
  new Promise((resolve) => {
    resolve({ data: { state: dataAppState, services: dataServices, presets: dataPresets } });
  });

export const ContentProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { loading, data } = useRequest<{ data: Record<string, boolean> }>(mockContentRequest);

  if (loading) return <Spin />;
  return <ContentContext.Provider value={data.data}>{children}</ContentContext.Provider>;
};

export const useContent = () => useContext(ContentContext);

export const useContentScope = (scope: string, key: string) => {
  const content = useContent();
  return useMemo(() => content?.['state']?.[scope]?.[key], [content, scope, key]);
};
