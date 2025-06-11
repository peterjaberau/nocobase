import { assign, fromPromise, setup } from 'xstate';



export const pluginMachine = setup({}).createMachine({
  id: 'plugin',
  initial: 'idle',
  context: ({ input }) => input,
  states: {
    idle: {
      on: {
        toggle: {
          actions: assign(({ context, event }) => {
            // event: changePath = config | value, targetKey: collapsed --> config.disabled, value.collapsed
            // target context = [changePath][targetKey]

            if (!event.changePath || !event.targetKey) return;

            const changePath = event.changePath;
            const targetKey = event.targetKey;

            context[changePath][targetKey] = !context[changePath][targetKey];
          }),
        },
      },
    },
  },
});

export const toolbarMachine = setup({
  actors: {
    pluginMachine,
  },
  guards: {},
}).createMachine({
  id: 'toolbar',
  context: (({ input, spawn }: any) => {
    const plugins = input.plugins || []
    return {
      plugins: plugins.map((plugin) => {
        const id = 'plugin-' + plugin.name;
        spawn('pluginMachine', {
          id: id,
          input: plugin,
          systemId: id,
        })
      })
    }

  }),
});

export const smartNodeMachine = setup({
  actions: {
    setToolbar: assign(({ context, spawn }) => {
      const plugins = context.config.plugins.filter((plugin) => plugin.scope === 'toolbar' && plugin.enabled);
      context.actors.toolbarRef = spawn('toolbarMachine', {
        input: {
          plugins: plugins,
        },
      });
    }),
  },
  actors: {
    toolbarMachine,
  }
}).createMachine({
  initial: 'initial',
  context: ({ input }) => ({
    config: {
      nodeType: 'default',
      title: 'Smart node title',
      plugins: [
        // scope: //toolbar, footer, content, beforeTitle, afterTitle
        {
          name: 'collapsible',
          enabled: true,
          scope: 'toolbar', //toolbar, footer, content, beforeTitle, afterTitle
          config: {
            disabled: false,
            defaultCollapse: true,
          },
          value: {
            collapsed: false,
          },
        },
        {
          name: 'attachToSidebar',
          enabled: true,
          scope: 'toolbar',
          config: {
            disabled: false,
            position: 'left',
            attached: false,
          },
        },
        {
          name: 'run',
          enabled: true,
          scope: 'toolbar',
          config: {
            disabled: false,
            value: 'not-started', // not-started, running, stopped, completed
          },
        },
        {
          name: 'dev-inputs',
          enabled: true,
          scope: 'footer',
          config: {
            title: 'Inputs',
            disabled: false,
            open: false,
          },
        },
        {
          name: 'dev-data',
          enabled: true,
          scope: 'footer',
          config: {
            title: 'Data',
            disabled: false,
            open: false,
          },
        },
        {
          name: 'dev-json',
          enabled: true,
          scope: 'footer',
          config: {
            title: 'JSON',
            disabled: false,
            open: false,
          },
        },
        {
          name: 'dev-settings',
          enabled: true,
          scope: 'footer',
          config: {
            title: 'Settings',
            disabled: false,
            open: false,
          },
        },
      ],
      features: {
        tools: {
          enableCollapsible: true,
          enableAttachToSidebar: true,
          enableRun: true,
          enableShowMore: true,
          developerPlugins: ['inputs', 'data', 'json', 'settings'],
        },
      },
    },
    value: {
      tools: {
        collapsible: {
          defaultCollapsed: true,
          collapsed: undefined,
        },
        attachToSidebar: {
          disabled: false,
        },
        run: {
          disabled: false,
        },
        showMore: {
          disabled: false,
        },
      },
      developer: {
        defaultActiveTab: 'data',
        activeTab: undefined,
      },
    },
    actors: {
      toolbarRef: null,
      contentRef: null,
      developerRef: null,
    },
    ...input,
  }),
  states: {
    initial: {
      entry: ['setToolbar'],
    },
  },
});


/*
export const toolbarMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  },
  actions: {
    spawnPlugins: (({ event, spawn }: any) => {
      const plugins = event.output.val;


      if (!plugins) return;

      return {
        plugins: plugins.map((plugin) => {
          const id = 'plugin-' + plugin.name;

          spawn('pluginMachine', {
            id: id,
            input: plugin,
            systemId: id,
          })
        })
      }

    }),
  },
  actors: {
    pluginMachine,
    getPluginsList: fromPromise(async ({ input }: any) => {

      return input.plugins;
    })
  },
  guards: {},
}).createMachine({
  id: 'toolbar',
  initial: 'loading-initial-plugins',
  context: (({ input, spawn }: any) => {
    const plugins = input.plugins || []


    return {
      plugins: plugins.map((plugin) => {
        const id = 'plugin-' + plugin.name;

        spawn('pluginMachine', {
          id: id,
          input: plugin,
          systemId: id,
        })
      })
    }

  }),
  states: {
    'loading-initial-plugins': {
      invoke: {
        src: 'getPluginsList',
        onDone: {
          actions: ['spawnPlugins'],
        }
      }
    },
  },
});


 */
