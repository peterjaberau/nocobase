import { assign, setup } from 'xstate';

import { SETTINGS_DATA_DEFAULT } from '../settings/defaultSettingsData';
import { buildMetaSchema } from '../schema/metaSchemaBuilder';
import { SETTINGS_SCHEMA } from '../settings/settingsSchema';

export const dataSourceMachine = setup({
  types: {
    context: {} as {
      userData?: {} | any;
      userSchemaData?: {} | any;
      newSchemaWasFetched?: boolean | any;
      settingsData?: {} | any;
      schemaSource?: {
        metaSchemaData?: any;
        settingsSchemaData?: any;
        [key: string]: any;
      };
      [key: string]: any;
    },
  },
}).createMachine({
  context: ({ input }) => ({
    dataSource: {
      userData: {},
      userSchemaData: {},
      newSchemaWasFetched: false,
      settingsData: {
        settingsVersion: '1.0.2',
        dataFormat: 'json',
        toolbarTitle: 'MetaConfigurator',
        hideSchemaEditor: false,
        hideSettings: false,
        codeEditor: {
          fontSize: 14,
          tabSize: 2,
          showFormatSelector: true,
          xml: {
            attributeNamePrefix: '_',
          },
        },
        guiEditor: {
          maximumDepth: 20,
          propertySorting: 'schemaOrder',
          hideAddPropertyButton: true,
        },
        schemaDiagram: {
          editMode: true,
          vertical: true,
          showAttributes: true,
          showEnumValues: true,
          maxAttributesToShow: 30,
          maxEnumValuesToShow: 10,
          moveViewToSelectedElement: false,
          automaticZoomMaxValue: 1,
          automaticZoomMinValue: 0.5,
          mergeAllOfs: true,
        },
        metaSchema: {
          allowBooleanSchema: false,
          allowMultipleTypes: false,
          objectTypesComfort: false,
          markMoreFieldsAsAdvanced: true,
          showAdditionalPropertiesButton: false,
          showJsonLdFields: false,
        },
        panels: {
          dataEditor: [
            {
              panelType: 'textEditor',
              mode: 'dataEditor',
              size: 50,
            },
            {
              panelType: 'guiEditor',
              mode: 'dataEditor',
              size: 50,
            },
          ],
          schemaEditor: [
            {
              panelType: 'textEditor',
              mode: 'schemaEditor',
              size: 33,
            },
            {
              panelType: 'schemaDiagram',
              mode: 'schemaEditor',
              size: 33,
            },
            {
              panelType: 'guiEditor',
              mode: 'schemaEditor',
              size: 33,
            },
          ],
          settings: [
            {
              panelType: 'textEditor',
              mode: 'settings',
              size: 50,
            },
            {
              panelType: 'guiEditor',
              mode: 'settings',
              size: 50,
            },
          ],
          hidden: ['aiPrompts', 'debug', 'test'],
        },
        frontend: {
          hostname: 'https://metaconfigurator.github.io/meta-configurator',
        },
        backend: {
          hostname: 'https://metaconfigurator.informatik.uni-stuttgart.de',
        },
        rdf: {
          sparqlEndpointUrl: 'https://dbpedia.org/sparql',
        },
        aiIntegration: {
          model: 'gpt-4o-mini',
          maxTokens: 5000,
          temperature: 0.0,
          endpoint: 'https://api.openai.com/v1/chat/completions',
        },
      },
    },
    schemaSource: {
      metaSchemaData: buildMetaSchema(SETTINGS_DATA_DEFAULT.metaSchema),
      settingsSchemaData: SETTINGS_SCHEMA,
    },
    ...input,
  }),
});
