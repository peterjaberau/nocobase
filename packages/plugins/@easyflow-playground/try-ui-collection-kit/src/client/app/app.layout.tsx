import React from 'react';
import { RootLayout } from './layout/layout';
import { Page } from './layout/page';

export const AppLayout = () => {
  return (
    <RootLayout>
      <Page />
    </RootLayout>
  );
};
