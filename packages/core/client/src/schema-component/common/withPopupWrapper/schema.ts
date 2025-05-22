

const popupSchema = {
  type: 'void',
  'x-component': 'Action.Container',
  'x-action': 'view',
  title: '{{ t("View record") }}',
  'x-component-props': {
    className: 'nb-action-popup',
  },
  properties: {
    tabs: {
      type: 'void',
      'x-component': 'Tabs',
      'x-component-props': {},
      'x-initializer': 'popup:addTab',
      properties: {
        tab1: {
          type: 'void',
          title: '{{t("Details")}}',
          'x-component': 'Tabs.TabPane',
          'x-designer': 'Tabs.Designer',
          'x-component-props': {},
          properties: {
            grid: {
              type: 'void',
              'x-component': 'Grid',
              'x-initializer': 'popup:common:addBlock',
              properties: {},
            },
          },
        },
      },
    },
  },
};
export { popupSchema };
