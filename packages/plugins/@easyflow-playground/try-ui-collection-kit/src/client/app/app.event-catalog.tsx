import React from 'react';
import { RootLayout } from './event-catalog/layout';
import { Page } from './event-catalog/page';
import { PlaygroundInstanceRenderer } from '../machines/renderers';

export const AppEventCatalog = () => {
  return (
    <RootLayout>
      <PlaygroundInstanceRenderer actorOptions={undefined}>
        <Page />
      </PlaygroundInstanceRenderer>
    </RootLayout>
  );
};
