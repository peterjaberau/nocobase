import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, InspectionEvent, spawnChild } from 'xstate';

import { simulatorMachine, paramsMachine, storiesMachine } from './machines';

const rootMachine = createMachine({
  entry: [
    spawnChild(paramsMachine, { systemId: 'params' }),
    spawnChild(simulatorMachine, { systemId: 'simulator' }),
    spawnChild(storiesMachine, { systemId: 'stories' }),
  ],
});

export const rootContext = createActorContext(rootMachine);

const RootContext = ({ children }) => {
  return <rootContext.Provider>{children}</rootContext.Provider>;
};

export default RootContext;
