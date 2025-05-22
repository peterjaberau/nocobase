

import { CompatibleSchemaInitializer } from '../../../../application/schema-initializer/CompatibleSchemaInitializer';
const commonOptions = {
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  items: [
    {
      name: 'filter',
      title: '{{t("Filter")}}',
      Component: 'CreateFilterActionInitializer',
      schema: {
        'x-action-settings': {},
      },
    },
    {
      name: 'reset',
      title: '{{t("Reset")}}',
      Component: 'CreateResetActionInitializer',
      schema: {
        'x-action-settings': {},
      },
    },
  ],
};

/**
 * @deprecated
 * use `filterFormActionInitializers` instead
 * 表单的操作配置
 */
export const filterFormActionInitializers_deprecated = new CompatibleSchemaInitializer({
  name: 'FilterFormActionInitializers',
  ...commonOptions,
});

export const filterFormActionInitializers = new CompatibleSchemaInitializer(
  {
    name: 'filterForm:configureActions',
    ...commonOptions,
  },
  filterFormActionInitializers_deprecated,
);
