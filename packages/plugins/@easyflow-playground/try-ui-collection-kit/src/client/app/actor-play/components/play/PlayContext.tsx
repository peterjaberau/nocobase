import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, InspectionEvent, spawnChild, setup } from 'xstate';

const playMachine = createMachine({
  entry: [],
});

export const playContext = createActorContext(playMachine);

const PlayContext = ({ children }) => {
  return <playContext.Provider>{children}</playContext.Provider>;
};

export default PlayContext;
