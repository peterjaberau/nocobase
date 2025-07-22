import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, spawnChild } from 'xstate';

export const globalPlaygroundMachine = createMachine({
  entry: [],
});

export const GlobalPlaygroundContext = createActorContext(globalPlaygroundMachine);

export const GlobalPlaygroundProvider = ({ children }) => {
  return <GlobalPlaygroundContext.Provider>{children}</GlobalPlaygroundContext.Provider>;
};
