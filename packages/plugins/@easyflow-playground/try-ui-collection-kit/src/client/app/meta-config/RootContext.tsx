import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, InspectionEvent, spawnChild } from 'xstate';
import {
  settingsMachine,
  settingsControlMachine,
  currentParamsMachine,
  appMachine,
  routerMachine,
} from './machines';
import { dataSourceMachine } from './data/dataSource';

const rootMachine = createMachine({
  entry: [
    spawnChild(settingsMachine, { systemId: 'settings-machine' }),
    spawnChild(settingsControlMachine, { systemId: 'settings-control-machine' }),
    spawnChild(currentParamsMachine, { systemId: 'current-params-machine' }),
    spawnChild(appMachine, { systemId: 'app-machine' }),
    spawnChild(routerMachine, { systemId: 'router-machine' }),
  ],
});

export const rootContext = createActorContext(rootMachine);

const RootContext = ({ children }) => {
  return <rootContext.Provider>{children}</rootContext.Provider>;
};

export default RootContext;
