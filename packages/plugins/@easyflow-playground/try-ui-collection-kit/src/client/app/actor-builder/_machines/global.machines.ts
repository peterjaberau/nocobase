import { assign, setup } from 'xstate';
import defaultStates from './global.defaults';

export const appDataMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      context.editingVersion = event.editingVersion;
    }),
    updateApps: assign(({ context, event }) => {
      context.apps = event.apps;
    }),
    updateAppDefinitionDiff: assign(({ context, event }) => {
      context.appDefinitionDiff = event.appDefinitionDiff;
    }),
    updateAppVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    updateAppVersionEventHandlers: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    createAppVersionEventHandlers: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    deleteAppVersionEventHandler: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    autoUpdateEventStore: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setIsSaving: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setAppId: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setAppPreviewLink: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setComponents: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setMetadata: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setEventToDeleteLoaderIndex: assign(({ context, event }) => {
      //TODO: to be developed
    }),
    updateIsDarkMode: assign(({ context, event }) => {
      //TODO: to be developed
    })

  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.appData,
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
    'apps.change': {
      actions: 'updateApps',
    },
    'app.definition.diff.change': {
      actions: 'updateAppDefinitionDiff',
    },
    'app.version.change': {
      actions: 'updateAppVersion',
    },
    'app.version.event.handlers.change': {
      actions: 'updateAppVersionEventHandlers',
    },
    'app.version.event.handlers.create': {
      actions: 'createAppVersionEventHandlers',
    },
    'app.version.event.handlers.delete': {
      actions: 'deleteAppVersionEventHandler',
    },
    'event.store.auto.change': {
      actions: 'autoUpdateEventStore',
    },
    'is.saving.setter': {
      actions: 'setIsSaving',
    },
    'app.id.setter': {
      actions: 'setAppId',
    },
    'app.preview.link.setter': {
      actions: 'setAppPreviewLink',
    },
    'components.setter': {
      actions: 'setComponents',
    },
    'metadata.setter': {
      actions: 'setMetadata',
    },
    'event.to.delete.loader.index.setter': {
      actions: 'setEventToDeleteLoaderIndex',
    },
    'is.dark.mode.setter': {
      actions: 'updateIsDarkMode',
    }

  }
});

export const appVersionMachine =  setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    enableReleasedVersionPopupState:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    updateReleasedVersionId:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    onEditorFreeze:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setAppVersions:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setAppVersionCurrentEnvironment:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setAppVersionPromoted:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.appVersion,
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
    'released.version.id.change': {
      actions: 'updateReleasedVersionId',
    },
    'editor.freezed.change': {
      actions: 'onEditorFreeze',
    },
    'app.versions.change': {
      actions: 'setAppVersions',
    },
    'app.version.current.environment.change': {
      actions: 'setAppVersionCurrentEnvironment',
    },
    'app.version.promoted.change': {
      actions: 'setAppVersionPromoted',
    },
  }
});

export const currentSessionMachine = setup({
  actions: {
    fetchOrganizations:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setOrganizations:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.currentSession,
    ...input,
  }),
  on: {
    'organizations.load': {
      actions: 'fetchOrganizations',
    },
    'organizations.setter': {
      actions: 'setOrganizations',
    }
  }
});

export const currentStateMachine = setup({
  actions: {
    setCurrentState:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setErrors:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setEditorReady:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    initializeCurrentStateOnVersionSwitch:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.currentState,
    ...input,
  }),
  on: {
    'current.state.setter': {
      actions: 'setCurrentState',
    },
    'errors.setter': {
      actions: 'setErrors',
    },
    'editor.ready.setter': {
      actions: 'setEditorReady',
    },
    'initialize.current.state.on.version.switch': {
      actions: 'initializeCurrentStateOnVersionSwitch',
    },
  }
});

export const dataQueriesMachine = setup({
  actions: {
    fetchDataQueries:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    setDataQueries:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    deleteDataQueries:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    updateDataQuery:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    createDataQuery:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    renameQuery:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    changeDataQuery:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
    duplicateQuery:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.dataQueries,
    ...input,
  }),
});

export const dataSourcesMachine = setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.dataSources,
    ...input,
  }),
});

export const editorMachine = setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.editor,
    ...input,
  }),
});

export const environmentsAndVersionsMachine = setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.environmentsAndVersions,
    ...input,
  }),
});

export const gridMachine = setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.grid,
    ...input,
  }),
});

export const keyboardShortcutsMachine = setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.keyboardShortcuts,
    ...input,
  }),
});

export const licenseMachine = setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.license,
    ...input,
  }),
});

export const queryPanelMachine = setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.queryPanel,
    ...input,
  }),
});

export const whiteLabelMachine = setup({
  actions: {
    updateEditingVersion:  assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...defaultStates.whiteLabel,
    ...input,
  }),
});
