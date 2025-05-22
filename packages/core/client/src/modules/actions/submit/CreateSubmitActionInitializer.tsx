

import React from 'react';
import { ActionInitializerItem } from '../../../schema-initializer/items/ActionInitializerItem';

export const CreateSubmitActionInitializer = (props) => {
  const schema = {
    title: '{{ t("Submit") }}',
    'x-action': 'submit',
    'x-component': 'Action',
    'x-use-component-props': 'useCreateActionProps',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:createSubmit',
    'x-component-props': {
      type: 'primary',
      htmlType: 'submit',
    },
  };
  return <ActionInitializerItem {...props} schema={schema} />;
};
