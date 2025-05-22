

import { uid } from '@formily/shared';
import React from 'react';
import { useSchemaInitializerItem } from '../../application';
import { InitializerWithSwitch } from './InitializerWithSwitch';

export const TableActionColumnInitializer = () => {
  const schema = {
    type: 'void',
    title: '{{ t("Actions") }}',
    'x-decorator': 'TableV2.Column.ActionBar',
    'x-component': 'TableV2.Column',
    'x-toolbar': 'TableColumnSchemaToolbar',
    'x-initializer': 'table:configureItemActions',
    'x-settings': 'fieldSettings:TableColumn',
    'x-toolbar-props': {
      initializer: 'table:configureItemActions',
    },
    'x-action-column': 'actions',
    properties: {
      [uid()]: {
        type: 'void',
        'x-decorator': 'DndContext',
        'x-component': 'Space',
        'x-component-props': {
          split: '|',
        },
        properties: {},
      },
    },
  };
  const itemConfig = useSchemaInitializerItem();
  return <InitializerWithSwitch {...itemConfig} schema={schema} item={itemConfig} type={'x-action-column'} />;
};
