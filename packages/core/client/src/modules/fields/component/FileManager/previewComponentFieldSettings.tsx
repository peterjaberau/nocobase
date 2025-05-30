

import { Field } from '@formily/core';
import { useField, useFieldSchema, useForm } from '@formily/react';
import { useTranslation } from 'react-i18next';
import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { useColumnSchema } from '../../../../schema-component/antd/table/Table.Column.Decorator';
import { useDesignable } from '../../../../schema-component/hooks/useDesignable';
import { showFileName, fileSizeSetting } from './fileManagerComponentFieldSettings';
import { useCompile } from '../../../../schema-component';

export const previewComponentFieldSettings = new SchemaSettings({
  name: 'fieldSettings:component:Preview',
  items: [
    {
      ...fileSizeSetting,
      useVisible() {
        const { fieldSchema: tableColumnSchema } = useColumnSchema();
        const isInTable = tableColumnSchema?.parent?.['x-component'] === 'TableV2.Column';
        return !isInTable;
      },
    },
    showFileName,
  ],
});
