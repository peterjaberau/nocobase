import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, InspectionEvent, spawnChild, setup } from 'xstate';
import { smartNodeMachine } from './machines';

const playMachine = createMachine({
  entry: [
    spawnChild(smartNodeMachine, { systemId: 'smart-node' }),
  ],
});

export const playContext: any = createActorContext(playMachine);

const PlayContext = ({ children }) => {
  return <playContext.Provider>{children}</playContext.Provider>;
};

export default PlayContext;
