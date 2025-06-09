import React from 'react';
import { RootLayout } from './meta-config/layout';
import { Page } from './meta-config/page';

export const AppMetaConfig = () => {
  return (
    <RootLayout>
      <Page />
    </RootLayout>
  );
};
