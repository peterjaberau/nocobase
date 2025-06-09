import React from 'react';
import { Provider } from './provider';
import RootContext from './RootContext';
// import { registerIcons } from './fontawesome';
// import { registerDefaultDataFormats } from './dataformats/defaultFormats';
// import { registerDefaultPanelTypes } from './components/panels/defaultPanelTypes';

// registerIcons();
// registerDefaultDataFormats();
// registerDefaultPanelTypes();

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootContext>
      <Provider>{children}</Provider>
    </RootContext>
  );
};
