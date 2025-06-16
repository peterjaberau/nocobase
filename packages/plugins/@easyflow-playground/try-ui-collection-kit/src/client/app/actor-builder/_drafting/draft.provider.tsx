import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, spawnChild } from 'xstate';
import {
  dataChildrenMachine,
  spawnedChildrenMachine,
  dataSpawnedChildrenMachine,
  pluginsManagerMachine,
} from './draft.machines';
import { pluginsPayload } from './draft.defaults';

export const draftMachine = createMachine({
  entry: [
    spawnChild(dataChildrenMachine, { systemId: 'data-children' }),
    spawnChild(spawnedChildrenMachine, { systemId: 'spawned-children' }),
    spawnChild(dataSpawnedChildrenMachine, { systemId: 'data-spawned-children' }),
    spawnChild(pluginsManagerMachine, { systemId: 'plugins-manager', input: pluginsPayload }),
  ],
});

export const DraftContext = createActorContext(draftMachine);

export const DraftProvider = ({ children }) => {
  return <DraftContext.Provider>{children}</DraftContext.Provider>;
};
