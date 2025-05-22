

import { Field } from '@formily/core';
import { useField, useFieldSchema } from '@formily/react';
import { useTranslation } from 'react-i18next';
import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { useColumnSchema, useDesignable, useCompile } from '../../../../schema-component';
import { useIsFieldReadPretty } from '../../../../schema-component/antd/form-item/FormItem.Settings';
import { showFileName, fileSizeSetting } from './fileManagerComponentFieldSettings';

export const uploadAttachmentComponentFieldSettings = new SchemaSettings({
  name: 'fieldSettings:component:Upload.Attachment',
  items: [
    {
      ...fileSizeSetting,
      useVisible() {
        const { fieldSchema: tableColumnSchema } = useColumnSchema();
        const isInTable = tableColumnSchema?.parent?.['x-component'] === 'TableV2.Column';
        const readPretty = useIsFieldReadPretty();
        return readPretty && !isInTable;
      },
    },
    showFileName,
  ],
});
