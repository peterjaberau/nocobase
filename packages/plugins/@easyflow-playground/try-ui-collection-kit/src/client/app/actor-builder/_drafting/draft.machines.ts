import { assign, setup, createMachine, spawnChild } from 'xstate';
import defaultStates from './draft.defaults';
import { pluginsPayload } from './draft.defaults';

export const dataChildrenMachine = createMachine({
  context: ({ input }: any) => ({
    ...defaultStates.actorsStrategyDemos,
    input,
  }),
});

export const dataSpawnedChildrenMachine = createMachine({
  context: ({ input }) => ({
    ...defaultStates.actorsStrategyDemos,
    input,
  }),
});

export const spawnedChildMachine = createMachine({
  context: ({ input }) => input,
});

export const spawnedChildrenMachine = setup({
  actors: {
    spawnedChildMachine,
  },
}).createMachine({
  initial: 'spawning',
  context: ({ input }) => input,
  states: {
    idle: {},
    spawning: {
      always: [
        {
          target: 'idle',
          actions: assign({
            items: ({ context, spawn }) => {
              return defaultStates.actorsStrategyDemos.items.map((item) => {
                return spawn('spawnedChildMachine', {
                  id: item.id,
                  systemId: item.id,
                  input: item,
                });
              });
            },
          }),
        },
      ],
    },
  },
});

// id: input.id,
// name: input.name,
// version: input.version,
// icon: input.icon,
// capabilities: input.capabilities,
// status: 'idle',

export const pluginMachine = createMachine({
  id: 'plugin',
  initial: 'idle',
  context: ({ input }) => input,

  states: {
    idle: {
      on: {
        EXECUTE: 'running',
      },
    },
    running: {
      on: {
        RESET: 'idle',
      },
    },
  },
});

export const pluginsManagerMachine = createMachine({
  id: 'pluginsManager',
  context: ({ input, spawn }) => {
    const pluginRefs = new Map();
    const metaList = new Map();
    console.log('input', input);

    input.plugins.forEach((plugin) => {
      const actor = spawn(pluginMachine, {
        id: `plugin-${plugin.id}`,
        systemId: `plugin-${plugin.id}`,
        input: plugin,
      });

      pluginRefs.set(plugin.id, actor);

      metaList.set(plugin.id, {
        ...plugin,
        config: {
          enabled: input.config?.[plugin.id]?.enabled ?? false,
        },
      });
    });

    return {
      pluginRefs,
      metaList,
    };
  },
  on: {
    TOGGLE_PLUGIN: {
      actions: assign(({ context, event }) => {
        const meta = context.metaList.get(event.pluginId);
        if (!meta) return;

        const nextEnabled = !meta.config.enabled;
        context.metaList.set(event.pluginId, {
          ...meta,
          config: { enabled: nextEnabled },
        });
      }),
    },
  },
});
//
//
// export const rootMachine = createMachine({
//   // entry: [
//   //   spawnChild(pluginsManagerMachine, { id: 'pluginsManager', systemId: 'plugins-manager', input: pluginsPayload})
//   // ],
//
//   //
//   //
//   entry: assign({
//     pluginsManagerRef: ({ spawn, input }) => spawn(pluginsManagerMachine, {
//       id: 'pluginsManager',
//       systemId: 'plugins-manager',
//       input: input,
//     }),
//   }),
// });
