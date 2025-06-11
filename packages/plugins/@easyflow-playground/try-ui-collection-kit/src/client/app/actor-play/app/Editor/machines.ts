import { assign, fromPromise, setup } from 'xstate';

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
  actors: {
    widgetMachine
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
});
