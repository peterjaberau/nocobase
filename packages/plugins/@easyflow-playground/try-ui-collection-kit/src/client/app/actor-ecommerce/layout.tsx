import React from 'react';
import { Provider } from './provider';
import RootContext from './app/RootContext';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootContext>
      <Provider>{children}</Provider>
    </RootContext>
  );
};
