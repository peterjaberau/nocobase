

import React from 'react';
import { ActionInitializerItem } from '../../../schema-initializer/items/ActionInitializerItem';

export const UpdateSubmitActionInitializer = (props) => {
  const schema = {
    title: '{{ t("Submit") }}',
    'x-action': 'submit',
    'x-component': 'Action',
    'x-use-component-props': 'useUpdateActionProps',
    // 'x-designer': 'Action.Designer',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:updateSubmit',
    'x-component-props': {
      type: 'primary',
      htmlType: 'submit',
    },
  };
  return <ActionInitializerItem {...props} schema={schema} />;
};
