

import { merge } from '@formily/shared';
import React from 'react';

import { SchemaInitializerItem, useSchemaInitializer, useSchemaInitializerItem } from '../../application';

export const ActionInitializerItem = (props) => {
  const itemConfig = useSchemaInitializerItem();
  const { insert } = useSchemaInitializer();

  return (
    <SchemaInitializerItem
      title={itemConfig.title}
      onClick={() => {
        const s = merge(props.schema || {}, itemConfig.schema || {});
        itemConfig?.schemaInitialize?.(s);
        insert(s);
      }}
    />
  );
};
