import React from 'react';
import { Provider } from './provider';
export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};
