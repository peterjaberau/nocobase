import { assign, fromPromise, setup } from 'xstate';
import Fuse from 'fuse.js';


export const searchMachine = setup({
  actions: {
    createInstance: assign(({ context }) => {
      context.instance = new Fuse(context.data, context.options);
    }),
    updateResults: assign(({ context, event }) => {
      context.results = event.output;
    }),
    updateQuery: assign(({ context, event }) => {
      context.query = event.query;
      context.searchId = Date.now();
    }),
  },
  actors: {
    createFuzzyInstance: fromPromise(async ({ context }: any) => {
      return context.instance.search(context.query);
    }),
    runFuzzySearch: fromPromise(async ({ context }: any) => {
      return context.instance.search(context.query);
    }),
  },
}).createMachine({
  id: 'search',
  initial: 'idle',
  context: ({ input }: any) =>
    ({
      instance: null,
      data: input.data || [],
      query: input.query ?? '',
      options: input.options ?? { keys: [] },
      searchId: null,
      results: [],
    }) as any,
  entry: ['createInstance'],
  states: {
    idle: {
      on: {
        QUERY_CHANGE: {
          target: 'debouncing',
          actions: ['updateQuery'],
        },
      },
    },
    debouncing: {
      after: {
        300: { target: 'searching' },
      },
      on: {
        QUERY_CHANGE: {
          actions: ['updateQuery'], // stays in debouncing if more input
        },
      },
    },
    searching: {
      invoke: {
        src: 'runFuzzySearch',
        onDone: {
          target: 'idle',
          guard: ({ context, event }: any) => event.input?.searchId === context.searchId,
          actions: ['updateResults'],
        },
      },
    },
  },
});

export const widgetMachine = setup({}).createMachine({
  id: 'editor-widget',
  initial: 'idle',
  context: ({ input }) => input,
  states: {
    idle: {
      on: {
        CLICK: {
          actions: assign(({ context, event }) => {
            console.log({
              context,
              event,
            });
            // event: changePath = config | value, targetKey: collapsed --> config.disabled, value.collapsed
            // target context = [changePath][targetKey]
          }),
        },
      }
    },
  },
});

export const editorWidgetsMachine = setup({
  actions: {
    spawnSearch: assign(({ context, spawn }) => {
      const data = context.widgets;

    })
  },
  actors: {
    widgetMachine,
    searchMachine
  }
}).createMachine({
  id: 'editor-widgets',
  context: ({ input, spawn }: any) => {
    let widgets = input.widgets || [];
    // Find the indices of ToggleSwitchLegacy and ToggleSwitch
    const legacyIndex = widgets.findIndex((component) => component?.name === 'ToggleSwitchLegacy');
    const toggleIndex = widgets.findIndex((component) => component?.name === 'ToggleSwitch');
    if (legacyIndex !== -1 && toggleIndex !== -1) {
      [widgets[legacyIndex], widgets[toggleIndex]] = [
        widgets[toggleIndex],
        widgets[legacyIndex],
      ];
    }


    return {
      search: null,
      widgets: widgets.map((widget) => {
        const id = 'editor-widget-' + widget.name;

        return spawn('widgetMachine', {
          id,
          input: widget,
          systemId: id,
        });
      }),
    };
  },
  // entry: ['spawnSearch']
});


