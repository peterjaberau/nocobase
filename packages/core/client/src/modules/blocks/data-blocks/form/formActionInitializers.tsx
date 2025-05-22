

import { SchemaInitializer } from '../../../../application/schema-initializer/SchemaInitializer';

/**
 * @deprecated
 * 表单的操作配置
 */
export const formActionInitializers = new SchemaInitializer({
  name: 'FormActionInitializers',
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  items: [
    {
      name: 'submit',
      title: '{{t("Submit")}}',
      Component: 'CreateSubmitActionInitializer',
      schema: {
        'x-action-settings': {},
      },
    },
    {
      name: 'customRequest',
      title: '{{t("Custom request")}}',
      Component: 'CustomRequestInitializer',
    },
  ],
});
