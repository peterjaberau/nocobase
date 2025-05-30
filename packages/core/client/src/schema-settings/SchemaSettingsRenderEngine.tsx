

import { Field } from '@formily/core';
import { useField, useFieldSchema } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTableBlockContext } from '../block-provider';
import { useDesignable } from '../schema-component/hooks/useDesignable';
import { SchemaSettingsSelectItem } from './SchemaSettings';

export function SchemaSettingsRenderEngine() {
  const field = useField<Field>();
  const fieldSchema = useFieldSchema();
  const { t } = useTranslation();
  const { dn } = useDesignable();
  const { service } = useTableBlockContext();
  const options = [
    {
      value: 'string',
      label: t('String template'),
    },
    {
      value: 'handlebars',
      label: t('Handlebars'),
    },
  ];
  return (
    <SchemaSettingsSelectItem
      key="render-template"
      title={t('Template engine')}
      options={options}
      value={field.decoratorProps.engine || 'string'}
      onChange={(engine) => {
        fieldSchema['x-decorator-props'] = fieldSchema['x-decorator-props'] || {};
        fieldSchema['x-decorator-props'].engine = engine;
        field.decoratorProps.engine = engine;
        dn.emit('patch', {
          schema: {
            ['x-uid']: fieldSchema['x-uid'],
            'x-decorator-props': fieldSchema['x-decorator-props'],
          },
        });
        dn.refresh();
      }}
    />
  );
}
