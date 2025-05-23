import React from 'react';
import { RootLayout } from './standalone/layout';
import { Page } from './standalone/page';

export const AppStandalone = () => {
  return (
    <RootLayout>
      <Page />
    </RootLayout>
  );
};
