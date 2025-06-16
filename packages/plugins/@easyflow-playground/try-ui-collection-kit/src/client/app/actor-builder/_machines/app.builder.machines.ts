import defaultStates from './app.builder.defaults';
import { assign, setup } from 'xstate';

export const createUserMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createOrganizationMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createAppMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createLoaderMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createLeftSideBarMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createComponentsMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createRightSideBarMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createModeMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createQueryPanelMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createDataQueryMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createDataSourceMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createUndoRedoMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createLayoutMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createResolvedMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createEnvironmentsAndVersionsMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createEditorLicenseMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createAppVersionMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createPageMenuMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createLicenseMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createDependencyMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createGridMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createEventsMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createMultiplayerMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createCodeHinterMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createDebuggerMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createGitSyncMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});

export const createAiMachine = setup({
  actions: {
    updateEditingVersion: assign(({ context, event }) => {
      //TODO: to be developed
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    ...input,
  }),
  on: {
    'editing.version.change': {
      actions: 'updateEditingVersion',
    },
  },
});
