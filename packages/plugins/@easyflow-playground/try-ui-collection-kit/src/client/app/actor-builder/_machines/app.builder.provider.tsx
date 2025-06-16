import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, spawnChild } from 'xstate';
import {
  createUserMachine,
  createOrganizationMachine,
  createAppMachine,
  createLoaderMachine,
  createLeftSideBarMachine,
  createComponentsMachine,
  createRightSideBarMachine,
  createModeMachine,
  createQueryPanelMachine,
  createDataQueryMachine,
  createDataSourceMachine,
  createUndoRedoMachine,
  createLayoutMachine,
  createResolvedMachine,
  createEnvironmentsAndVersionsMachine,
  createEditorLicenseMachine,
  createAppVersionMachine,
  createPageMenuMachine,
  createLicenseMachine,
  createDependencyMachine,
  createGridMachine,
  createEventsMachine,
  createMultiplayerMachine,
  createCodeHinterMachine,
  createDebuggerMachine,
  createGitSyncMachine,
  createAiMachine,
} from './app.builder.machines';

export const appBuilderMachine = createMachine({
  entry: [
    spawnChild(createUserMachine, { systemId: 'user' }),
    spawnChild(createOrganizationMachine, { systemId: 'organization' }),
    spawnChild(createAppMachine, { systemId: 'app' }),
    spawnChild(createLoaderMachine, { systemId: 'loader' }),
    spawnChild(createLeftSideBarMachine, { systemId: 'left-side-bar' }),
    spawnChild(createComponentsMachine, { systemId: 'components' }),
    spawnChild(createRightSideBarMachine, { systemId: 'right-side-bar' }),
    spawnChild(createModeMachine, { systemId: 'mode' }),
    spawnChild(createQueryPanelMachine, { systemId: 'query-panel' }),
    spawnChild(createDataQueryMachine, { systemId: 'data-query' }),
    spawnChild(createDataSourceMachine, { systemId: 'data-source' }),
    spawnChild(createUndoRedoMachine, { systemId: 'undo-redo' }),
    spawnChild(createLayoutMachine, { systemId: 'layout' }),
    spawnChild(createResolvedMachine, { systemId: 'resolved' }),
    spawnChild(createEnvironmentsAndVersionsMachine, { systemId: 'environments-and-versions' }),
    spawnChild(createEditorLicenseMachine, { systemId: 'editor-license' }),
    spawnChild(createAppVersionMachine, { systemId: 'app-version' }),
    spawnChild(createPageMenuMachine, { systemId: 'page-menu' }),
    spawnChild(createLicenseMachine, { systemId: 'license' }),
    spawnChild(createDependencyMachine, { systemId: 'dependency' }),
    spawnChild(createGridMachine, { systemId: 'grid' }),
    spawnChild(createEventsMachine, { systemId: 'events' }),
    spawnChild(createMultiplayerMachine, { systemId: 'multiplayer' }),
    spawnChild(createCodeHinterMachine, { systemId: 'code-hinter' }),
    spawnChild(createDebuggerMachine, { systemId: 'debugger' }),
    spawnChild(createGitSyncMachine, { systemId: 'git-sync' }),
    spawnChild(createAiMachine, { systemId: 'ai' }),
  ],
});

export const AppBuilderContext = createActorContext(appBuilderMachine);

export const AppBuilderProvider = ({ children }) => {
  return <AppBuilderContext.Provider>{children}</AppBuilderContext.Provider>;
};
