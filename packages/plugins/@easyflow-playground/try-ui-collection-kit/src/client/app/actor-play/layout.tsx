import React from 'react';
import { Provider } from './provider';
import PlayContext from './components/play/PlayContext';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PlayContext>
      <Provider>{children}</Provider>
    </PlayContext>
  );
};
