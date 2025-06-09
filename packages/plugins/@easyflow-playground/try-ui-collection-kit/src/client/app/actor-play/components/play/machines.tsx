import { setup } from 'xstate';

export const smartNodeMachine = setup({}).createMachine({
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
            collapsed: undefined,
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
      nodeFeaturesRef: null,
      nodeContentRef: null,
      nodeDeveloperRef: null,
    },
    ...input,
  }),
  states: {
    initial: {

    }
  }
});
