

import { merge } from '@formily/shared';
import React from 'react';

import { useUpdate } from 'ahooks';
import { SchemaInitializerSwitch, useSchemaInitializer } from '../../application';
import { useCurrentSchema } from '../utils';

export const InitializerWithSwitch = (props) => {
  const { type, schema, item, remove: passInRemove, disabled } = props;
  const { exists, remove } = useCurrentSchema(
    schema?.[type] || item?.schema?.[type],
    type,
    item.find,
    passInRemove ?? item.remove,
    schema?.name || item?.schema?.name,
  );
  const { insert } = useSchemaInitializer();
  const update = useUpdate();
  return (
    <SchemaInitializerSwitch
      checked={exists}
      disabled={disabled}
      title={item.title}
      onClick={() => {
        if (disabled) {
          return;
        }
        if (exists) {
          remove();
          return update();
        }
        const s = merge(schema || {}, item.schema || {});
        item?.schemaInitialize?.(s);
        insert(s);
        update();
      }}
    />
  );
};
