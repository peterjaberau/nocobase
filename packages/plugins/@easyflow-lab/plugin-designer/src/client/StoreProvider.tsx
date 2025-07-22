import { createContext, FC, ReactNode, useContext } from 'react';
import { Spin } from 'antd';

import { useRequest } from '@easyflow/client';
import { dataStore } from './dataset';

const StoreContext = createContext<any>({});

const mockStoreRequest = () =>
  new Promise((resolve) => {
    resolve({ data: { ...dataStore.root } });
  });

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { loading, data } = useRequest<{ data: Record<string, boolean> }>(mockStoreRequest);

  if (loading) return <Spin />;
  return <StoreContext.Provider value={data.data}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
