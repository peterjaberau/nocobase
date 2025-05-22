

import { CompatibleSchemaInitializer } from '../../../../application/schema-initializer/CompatibleSchemaInitializer';

const commonOptions = {
  title: '{{t("Configure actions")}}',
  icon: 'SettingOutlined',
  items: [
    {
      name: 'submit',
      title: '{{t("Submit")}}',
      Component: 'UpdateSubmitActionInitializer',
      schema: {
        'x-action-settings': {},
      },
    },
    {
      name: 'popup',
      title: '{{t("Popup")}}',
      Component: 'PopupActionInitializer',
      useComponentProps() {
        return {
          'x-component': 'Action',
        };
      },
    },
    {
      type: 'item',
      name: 'customRequest',
      title: '{{t("Custom request")}}',
      Component: 'CustomRequestInitializer',
    },
  ],
};

/**
 * @deprecated
 * use `updateFormActionInitializers` instead
 */
export const updateFormActionInitializers_deprecated = new CompatibleSchemaInitializer({
  name: 'UpdateFormActionInitializers',
  ...commonOptions,
});

export const updateFormActionInitializers = new CompatibleSchemaInitializer(
  {
    name: 'editForm:configureActions',
    ...commonOptions,
  },
  updateFormActionInitializers_deprecated,
);
