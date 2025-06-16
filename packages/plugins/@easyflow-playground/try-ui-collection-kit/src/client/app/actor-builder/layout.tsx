import React from 'react';
import { Provider } from './provider';
import { DraftProvider } from './_drafting/draft.provider';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <DraftProvider>
        {children}
      </DraftProvider>
    </Provider>
  );
};
