

import { useFieldSchema } from '@formily/react';
import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { SchemaSettingsTimeFormat } from '../../../../schema-settings/SchemaSettingsTimeFormat';
import { useColumnSchema } from '../../../../schema-component/antd/table-v2/Table.Column.Decorator';

export const timePickerComponentFieldSettings = new SchemaSettings({
  name: 'fieldSettings:component:TimePicker',
  items: [
    {
      name: 'timeDisplayFormat',
      Component: SchemaSettingsTimeFormat as any,
      useComponentProps() {
        const schema = useFieldSchema();
        const { fieldSchema: tableColumnSchema } = useColumnSchema();
        const fieldSchema = tableColumnSchema || schema;
        return {
          fieldSchema,
        };
      },
    },
  ],
});
