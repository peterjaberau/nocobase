

import { LineOutlined } from '@ant-design/icons';
import React from 'react';
import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '../../../../application';

export const DividerFormItemInitializer = () => {
  const { insert } = useSchemaInitializer();
  const itemConfig = useSchemaInitializerItem();
  return (
    <SchemaInitializerItem
      {...itemConfig}
      icon={<LineOutlined />}
      onClick={() => {
        insert({
          type: 'void',
          'x-decorator': 'FormItem',
          'x-toolbar': 'FormItemSchemaToolbar',
          'x-settings': 'blockSettings:divider',
          'x-component': 'Divider',
          'x-component-props': {
            children: '{{t("Group")}}',
          },
        });
      }}
    />
  );
};
