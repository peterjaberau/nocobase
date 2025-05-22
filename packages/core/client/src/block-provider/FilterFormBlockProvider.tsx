

import { useFieldSchema } from '@formily/react';
import React from 'react';
import { withDynamicSchemaProps } from '../hoc/withDynamicSchemaProps';
import { FilterCollectionField } from '../modules/blocks/filter-blocks/FilterCollectionField';
import { DatePickerProvider, SchemaComponentOptions } from '../schema-component';
import { DefaultValueProvider } from '../schema-settings';
import { CollectOperators } from './CollectOperators';
import { FormBlockProvider } from './FormBlockProvider';

export const FilterFormBlockProvider = withDynamicSchemaProps((props) => {
  const filedSchema = useFieldSchema();
  // 'x-filter-operators' 已被弃用，这里是为了兼容旧的配置
  const deprecatedOperators = filedSchema['x-filter-operators'] || {};

  return (
    <SchemaComponentOptions components={{ CollectionField: FilterCollectionField }}>
      <CollectOperators defaultOperators={deprecatedOperators}>
        <DatePickerProvider value={{ utc: false }}>
          <DefaultValueProvider isAllowToSetDefaultValue={() => false}>
            <FormBlockProvider name="filter-form" {...props} confirmBeforeClose={false}></FormBlockProvider>
          </DefaultValueProvider>
        </DatePickerProvider>
      </CollectOperators>
    </SchemaComponentOptions>
  );
});
