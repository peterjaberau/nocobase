

import { useCollection } from '../../../../data-source';
import { CompatibleSchemaInitializer } from '../../../../application/schema-initializer/CompatibleSchemaInitializer';
import { useActionAvailable } from '../../useActionAvailable';
const commonOptions = {
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  style: {
    marginLeft: 8,
  },
  items: [
    {
      type: 'itemGroup',
      title: '{{t("Enable actions")}}',
      name: 'enableActions',
      children: [
        {
          name: 'edit',
          title: '{{t("Edit")}}',
          Component: 'UpdateActionInitializer',
          schema: {
            'x-component': 'Action',
            'x-decorator': 'ACLActionProvider',
            'x-component-props': {
              type: 'primary',
            },
          },
          useVisible: () => useActionAvailable('update'),
        },
        {
          name: 'delete',
          title: '{{t("Delete")}}',
          Component: 'DestroyActionInitializer',
          schema: {
            'x-component': 'Action',
            'x-decorator': 'ACLActionProvider',
          },
          useVisible: () => useActionAvailable('destroy'),
        },
      ],
    },
  ],
};

/**
 * @deprecated
 * use `detailsActionInitializers` instead
 * 表单的操作配置
 */
export const detailsActionInitializers_deprecated = new CompatibleSchemaInitializer({
  name: 'DetailsActionInitializers',
  ...commonOptions,
});

/**
 * @deprecated
 * 已弃用，请使用 readPrettyFormActionInitializers 代替
 */
export const detailsActionInitializers = new CompatibleSchemaInitializer(
  {
    name: 'detailsWithPaging:configureActions',
    ...commonOptions,
  },
  detailsActionInitializers_deprecated,
);
