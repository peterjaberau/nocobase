

import { CompatibleSchemaInitializer } from '../../../../application/schema-initializer/CompatibleSchemaInitializer';
import { useDataBlockProps } from '../../../../data-source';

const commonOptions = {
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
      useVisible() {
        const { type } = useDataBlockProps() || ({} as any);
        return type !== 'publicForm';
      },
    },
  ],
};

/**
 * @deprecated
 * use `createFormActionInitializers` instead
 */
export const createFormActionInitializers_deprecated = new CompatibleSchemaInitializer({
  name: 'CreateFormActionInitializers',
  ...commonOptions,
});

export const createFormActionInitializers = new CompatibleSchemaInitializer(
  {
    name: 'createForm:configureActions',
    ...commonOptions,
  },
  createFormActionInitializers_deprecated,
);
