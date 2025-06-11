import React from 'react';
import './css/styles.css';
import { Provider } from './provider';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
      <Provider>{children}</Provider>
  );
};
