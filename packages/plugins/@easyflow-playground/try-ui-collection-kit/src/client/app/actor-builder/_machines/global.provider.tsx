import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, spawnChild } from 'xstate';
import {
  appDataMachine,
  appVersionMachine,
  currentSessionMachine,
  currentStateMachine,
  dataQueriesMachine,
  dataSourcesMachine,
  editorMachine,
  environmentsAndVersionsMachine,
  gridMachine,
  keyboardShortcutsMachine,
  licenseMachine,
  queryPanelMachine,
  whiteLabelMachine,
} from './global.machines';

export const globalMachine = createMachine({
  entry: [
    spawnChild(appDataMachine, { systemId: 'app-data' }),
    spawnChild(appVersionMachine, { systemId: 'app-version' }),
    spawnChild(currentSessionMachine, { systemId: 'current-session' }),
    spawnChild(currentStateMachine, { systemId: 'current-state' }),
    spawnChild(dataQueriesMachine, { systemId: 'data-queries' }),
    spawnChild(dataSourcesMachine, { systemId: 'data-sources' }),
    spawnChild(editorMachine, { systemId: 'editor' }),
    spawnChild(environmentsAndVersionsMachine, { systemId: 'environments-and-versions' }),
    spawnChild(gridMachine, { systemId: 'grid' }),
    spawnChild(keyboardShortcutsMachine, { systemId: 'keyboard-shortcuts' }),
    spawnChild(licenseMachine, { systemId: 'license' }),
    spawnChild(queryPanelMachine, { systemId: 'query-panel' }),
    spawnChild(whiteLabelMachine, { systemId: 'white-label' }),
  ]
})

export const GlobalContext = createActorContext(globalMachine)

export const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider>{children}</GlobalContext.Provider>
}
