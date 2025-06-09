import { assign, fromPromise, setup } from 'xstate';
import { settings, packagedSchemas, data, schema } from './data';

export const tmpMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  },
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  initial: 'initial',
  context: ({ input }) => ({
    name: null,
    ...input,
  }),
});


export const settingsMachine = setup({
  actions: {
    updateMetaSchemaSettings: assign(({ context, event }) => {
      context.metaSchema = {
        ...context.metaSchema,
        ...event.playload,
      };
    }),

    updateCodeEditorSettings: assign(({ context, event }) => {
      context.codeEditor = {
        ...context.codeEditor,
        ...event.playload,
      };
    }),

    updateGuiEditorSettings: assign(({ context, event }) => {
      context.guiEditor = {
        ...context.guiEditor,
        ...event.playload,
      };
    }),

    updateSchemaDiagramSettings: assign(({ context, event }) => {
      context.schemaDiagram = {
        ...context.schemaDiagram,
        ...event.playload,
      };
    }),

    updatePanelSettings: assign(({ context, event }) => {
      // scope = dataEditor | schemaEditor | settings
      const scope = event.scope || null;

      if (!scope) {
        return;
      }

      context.panels[scope] = {
        ...context.panels[scope],
        ...event.playload,
      };
    }),

    updatePanelHiddenSettings: assign(({ context, event }) => {
      context.panels.hidden = {
        ...context.panels.hidden,
        ...event.playload,
      };
    }),

    updateAiIntegrationSettings: assign(({ context, event }) => {
      context.aiIntegration = {
        ...context.aiIntegration,
        ...event.playload,
      };
    }),

    updateSettingKeyValue: assign(({ context, event }) => {
      context.settings[event.key] = event.value;
    }),
  },
  actors: {},
  guards: {},
}).createMachine({
  initial: 'idle',
  context: ({ input }) => ({
    ...settings.SETTINGS_DATA_DEFAULT,
    ...input,
  }),
  states: {
    idle: {
      on: {
        META_SCHEMA_SETTINGS_CHANGE: {
          actions: 'updateMetaSchemaSettings',
        },
        CODE_EDITOR_SETTINGS_CHANGE: {
          actions: 'updateCodeEditorSettings',
        },
        GUI_EDITOR_SETTINGS_CHANGE: {
          actions: ['updateGuiEditorSettings'],
        },
        SCHEMA_DIAGRAM_SETTINGS_CHANGE: {
          actions: ['updateSchemaDiagramSettings'],
        },

        PANEL_SETTINGS_CHANGE: {
          actions: ['updatePanelSettings'],
        },

        PANEL_HIDDEN_SETTINGS_CHANGE: {
          actions: ['updatePanelHiddenSettings'],
        },

        AI_INTEGRATION_SETTINGS_CHANGE: {
          actions: ['updateAiIntegrationSettings'],
        },

        SETTING_KEY_VALUE_CHANGE: {
          actions: ['updateSettingKeyValue'],
        },
      },
    },
  },
});

export const settingsControlMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  },
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  initial: 'initial',
  context: ({ input }) => ({
    sessionModeOptions: ['data-editor', 'schema-editor', 'settings'],
    ...input,
  }),
});

export const currentParamsMachine = setup({
  actions: {
    setSessionMode: assign(({ context, event }) => {
      context.sessionMode = event.playload;
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    sessionMode: 'data-editor',
    ...input,
  }),
  initial: 'initial',
  states: {
    initial: {
      on: {
        SESSION_MODE_CHANGE: {
          actions: 'setSessionMode',
        },
      },
    },
  },
});

export const appMachine = setup({
  types: {
    context: {} as {
      currentMode?: 'data-editor' | 'schema-editor' | 'settings';
      hasShownInitialDialog?: boolean;
      [key: string]: any;
    },
  },
  actions: {
    setSessionMode: assign(({ context, event }) => {
      context.currentMode = event.currentMode;
    }),
    toggleShownInitialDialog: assign(({ context, event }) => {
      context.hasShownInitialDialog = !context.hasShownInitialDialog;
    }),

    setMetaSchemaData: assign(({ context, event }) => {
      let metaSchema: any = packagedSchemas.metaSchemaSimplified;
      const metaSchemaSettings = context.datasource.settingsData.metaSchema;
      const metaSchemaEvent = event?.payload;
      const newMetaSchemaSettings = {
        allowBooleanSchema: metaSchemaEvent?.allowBooleanSchema ?? metaSchemaSettings.allowBooleanSchema,
        allowMultipleTypes: metaSchemaEvent?.allowMultipleTypes ?? metaSchemaSettings.allowMultipleTypes,
        objectTypesComfort: metaSchemaEvent?.objectTypesComfort ?? metaSchemaSettings.objectTypesComfort,
        markMoreFieldsAsAdvanced:
          metaSchemaEvent?.markMoreFieldsAsAdvanced ?? metaSchemaSettings.markMoreFieldsAsAdvanced,
        showAdditionalPropertiesButton:
          metaSchemaEvent?.showAdditionalPropertiesButton ?? metaSchemaSettings.showAdditionalPropertiesButton,
        showJsonLdFields: metaSchemaEvent?.showJsonLdFields ?? metaSchemaSettings.showJsonLdFields,
      };

      if (!newMetaSchemaSettings.allowBooleanSchema) {
        metaSchema.$defs!.jsonSchema = schema.metaSchemaBuilder.DEF_JSON_SCHEMA_WITHOUT_BOOLEAN_SCHEMA;
      }

      if (!newMetaSchemaSettings.allowMultipleTypes) {
        metaSchema.$defs!.typeDefinition = schema.metaSchemaBuilder.DEF_TYPE_DEFINITION_WITHOUT_MULTIPLE_TYPES;
      }

      if (!metaSchemaSettings.showAdditionalPropertiesButton) {
        metaSchema.$defs!.objectSubSchema!.metaConfigurator = {
          hideAddPropertyButton: true,
        };
      }

      if (metaSchemaSettings.markMoreFieldsAsAdvanced) {
        metaSchema.$defs!.constProperty!.properties!.const.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!.enumProperty!.properties!.enum.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!.objectProperty!.properties!.additionalProperties.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!.stringProperty!.properties!.maxLength.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!.stringProperty!.properties!.minLength.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!.stringProperty!.properties!.pattern.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!.arrayProperty!.properties!.minItems.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!.arrayProperty!.properties!.maxItems.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!.arrayProperty!.properties!.uniqueItems.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!['meta-data']!.properties!.examples.metaConfigurator = {
          advanced: true,
        };
        metaSchema.$defs!['meta-data']!.properties!.default.metaConfigurator = {
          advanced: true,
        };
      }

      if (metaSchemaSettings.objectTypesComfort) {
        metaSchema.$defs.enumProperty.allOf = schema.metaSchemaBuilder.ALL_OF_ENUM_PROPERTY;
        metaSchema.$defs['meta-data'].allOf = schema.metaSchemaBuilder.ALL_OF_META_DATA;

        // delete properties that are not compatible with this option
        delete metaSchema.$defs.schemaComposition.properties.not;
        metaSchema.$defs.conditionalSchema = {};
        delete metaSchema.$defs.objectProperty.properties.additionalProperties;
        delete metaSchema.$defs.objectProperty.properties.propertyNames;
        delete metaSchema.$defs.objectProperty.properties.dependentRequired;
        delete metaSchema.$defs.objectProperty.properties.dependentSchemas;
        delete metaSchema.$defs.objectProperty.properties.unevaluatedProperties;
        delete metaSchema.$defs.arrayProperty.properties.unevaluatedItems;
        delete metaSchema.$defs.arrayProperty.properties.items;
      }

      if (metaSchemaSettings.showJsonLdFields) {
        for (const key in schema.metaSchemaBuilder.JSON_LD_DEFS) {
          const value: any = schema.metaSchemaBuilder.JSON_LD_DEFS[key];
          metaSchema.$defs[key] = value;
        }
        metaSchema.$defs.rootObjectSubSchema!.allOf! = [
          {
            $ref: '#/$defs/jsonLdContextHaving',
          },
          ...metaSchema.$defs.rootObjectSubSchema!.allOf!,
        ];

        metaSchema.$defs.objectSubSchema!.allOf! = [
          {
            $ref: '#/$defs/jsonLdCommon',
          },
          ...metaSchema.$defs.objectSubSchema!.allOf!,
        ];
      }

      const simplified =
        !metaSchemaSettings.allowBooleanSchema ||
        !metaSchemaSettings.allowMultipleTypes ||
        metaSchemaSettings.objectTypesComfort;
      if (simplified) {
        metaSchema.$defs.jsonMetaSchema.title = 'Simplified JSON Meta Schema';
      }

      context.schemaSource.metaSchemaData = metaSchema;
    }),
  },
}).createMachine({
  initial: 'initial',
  context: ({ input }) => ({
    currentMode: 'data-editor',
    hasShownInitialDialog: false,
    datasource: {
      userData: {},
      userSchemaData: {},
      newSchemaWasFetched: false,
      settingsData: settings.SETTINGS_DATA_DEFAULT,
    },
    schemaSource: {
      metaSchemaData: null,
      settingsSchemaData: settings.SETTINGS_SCHEMA,
    },
    ...input,
  }),
  states: {
    initial: {
      entry: ['setMetaSchemaData'],
      on: {
        SESSION_MODE_CHANGE: {
          actions: 'setSessionMode',
        },
        SHOW_INITIAL_DIALOG_CHANGE: {
          actions: 'toggleShownInitialDialog',
        },
      },
    },
  },
});

export const routerMachine = setup({
  types: {
    context: {} as {
      currentRoute?:
        | {
            path?: string | any;
            name?: string | any;
            component?: any;
            meta: {
              title?: string | any;
              sessionMode?: string | any;
              [key: string]: any;
            };
            [key: string]: any;
          }
        | any;
      routes:
        | {
            path?: string | any;
            name?: string | any;
            component?: any;
            meta: {
              title?: string | any;
              sessionMode?: string | any;
              [key: string]: any;
            };
            [key: string]: any;
          }[]
        | any;
    },
  },
}).createMachine({
  initial: 'initial',
  context: ({ input }) => ({
    currentRoute: {
      path: '/data',
      name: 'data',
      component: 'DataEditorView',
      meta: {
        title: 'DataEditor',
        sessionMode: 'data-editor',
      },
    },
    routes: [
      {
        path: '/data',
        name: 'data',
        component: 'DataEditorView',
        meta: {
          title: 'DataEditor',
          sessionMode: 'data-editor',
        },
      },
      {
        path: '/schema',
        name: 'schema',
        component: 'SchemaEditorView',
        meta: {
          title: 'SchemaEditor',
          sessionMode: 'schema-editor',
        },
      },
      {
        path: '/settings',
        name: 'settings',
        component: 'SettingsEditorView',
        meta: {
          title: 'SettingEditor',
          sessionMode: 'settings',
        },
      },
      {
        path: '/',
        name: 'fetch',
        component: 'FetchView',
        props: true,
        meta: {
          title: 'DataEditor',
          sessionMode: 'data-editor',
        },
      },
    ],
    ...input,
  }),
});

