

import React from 'react';
import { usePopupUtils } from '../../../schema-component/antd/page/pagePopupUtils';
import { CONTEXT_SCHEMA_KEY } from '../../../schema-component/antd/page/usePopupContextInActionOrAssociationField';
import { ActionInitializerItem } from '../../../schema-initializer/items/ActionInitializerItem';
import { useOpenModeContext } from '../../popup/OpenModeProvider';

export const ViewActionInitializer = (props) => {
  const { defaultOpenMode } = useOpenModeContext();
  const { getPopupContext } = usePopupUtils();
  const schema = {
    type: 'void',
    title: '{{ t("View") }}',
    'x-action': 'view',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:view',
    'x-component': 'Action',
    'x-component-props': {
      openMode: defaultOpenMode,
    },
    properties: {
      drawer: {
        type: 'void',
        title: '{{ t("View record") }}',
        'x-component': 'Action.Container',
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
      },
    },
    [CONTEXT_SCHEMA_KEY]: getPopupContext(),
  };
  return <ActionInitializerItem {...props} schema={schema} />;
};
