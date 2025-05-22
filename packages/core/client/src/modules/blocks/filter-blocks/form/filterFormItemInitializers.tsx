

import { CompatibleSchemaInitializer } from '../../../../application/schema-initializer/CompatibleSchemaInitializer';
import {
  FilterAssociatedFields,
  FilterParentCollectionFields,
} from '../../../../schema-initializer/buttons/FormItemInitializers';
import { gridRowColWrap, useFilterFormItemInitializerFields } from '../../../../schema-initializer/utils';

const commonOptions = {
  wrap: gridRowColWrap,
  icon: 'SettingOutlined',
  title: '{{t("Configure fields")}}',
  items: [
    {
      type: 'itemGroup',
      name: 'displayFields',
      title: '{{t("Display fields")}}',
      useChildren: useFilterFormItemInitializerFields,
    },
    {
      name: 'parentCollectionFields',
      Component: FilterParentCollectionFields,
    },
    {
      name: 'associationFields',
      Component: FilterAssociatedFields,
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      title: '{{t("Add Markdown")}}',
      Component: 'MarkdownFormItemInitializer',
      name: 'addText',
    },
  ],
};

/**
 * @deprecated
 * use `filterFormItemInitializers` instead
 */
export const filterFormItemInitializers_deprecated = new CompatibleSchemaInitializer({
  name: 'FilterFormItemInitializers',
  ...commonOptions,
});

export const filterFormItemInitializers = new CompatibleSchemaInitializer(
  {
    name: 'filterForm:configureFields',
    ...commonOptions,
  },
  filterFormItemInitializers_deprecated,
);
