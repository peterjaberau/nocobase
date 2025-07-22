export const config = {
  button: {
    key: 'button',
    component: 'Button',
    schema: {
      config: {
        type: 'object',
        properties: {
          children: {
            type: 'string',
            description: 'Set button text',
            title: 'text',
            renderProps: {
              allowClear: true,
              placeholder: 'Empty values will not be displayed normally',
              autoFocus: true,
            },
          },
          type: {
            type: 'string',
            title: 'type',
            renderType: 'radioGroup',
            default: 'default',
            enum: ['primary', 'default', 'dashed', 'link', 'text'],
            enumNames: ['emphasis', 'default', 'dashed', 'link', 'text'],
            renderOptions: {
              layout: 'vertical',
              noLabel: true,
            },
          },
          danger: {
            type: 'boolean',
            renderType: 'boolean',
            title: 'dangerousState',
            default: false,
          },
          icon: {
            type: 'string',
            title: 'Icon',
            default: '',
          },
          size: {
            title: 'size',
            type: 'string',
            renderType: 'radioGroup',
            enum: ['large', 'middle', 'small'],
            enumNames: ['Large', 'Medium', 'Small'],
            default: 'middle',
            category: 'style',
          },
          shape: {
            title: 'shape',
            type: 'string',
            renderType: 'radioGroup',
            enumOptions: [
              {
                label: 'default',
              },
              {
                label: 'circle',
                value: 'circle',
              },
              {
                label: 'capsule',
                value: 'round',
              },
            ],
            category: 'style',
            renderOptions: {},
          },
          loading: {
            type: 'boolean',
            renderType: 'boolean',
            title: 'loading',
            default: false,
            category: 'status',
          },
          disabled: {
            type: 'boolean',
            renderType: 'boolean',
            title: 'disable',
            default: false,
            category: 'status',
          },
          ghost: {
            type: 'boolean',
            renderType: 'boolean',
            title: 'ghostButton',
            default: false,
            category: 'style',
          },
        },
      },
      store: {},
    },
    parser: {
      props: {},
    },
    defaultConfig: {
      props: {
        children: 'Button',
        type: 'default',
      },
      config: {
        replace: true,
      },
    },
    variants: {
      default: {
        props: {
          children: 'Default Button',
          type: 'default',
        },
        config: {
          replace: true,
        },
      },
      primary: {
        props: {
          children: 'Primary Buttons',
          type: 'primary',
          size: 'small',
        },
        config: {
          replace: true,
        },
      },
      danger: {
        props: {
          children: 'Danger',
          type: 'dashed',
          danger: true,
          size: 'large',
          ghost: true,
          shape: 'round',
        },
        config: {
          replace: true,
        },
      },
    },
    code: {
      props: {
        type: 'string',
        renderType: 'code',
        default: '\nimport { Button } from "antd";\n\nexport default () => <%= component %>;\n',
      },
      env: {},
    },
    parts: {},
  },
};
