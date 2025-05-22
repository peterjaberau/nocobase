

import React from 'react';
import { ActionInitializerItem } from './ActionInitializerItem';

export const SubmitActionInitializer = (props) => {
  const schema = {
    title: '{{ t("Submit") }}',
    'x-action': 'submit',
    'x-component': 'Action',
    // 'x-designer': 'Action.Designer',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:submit',
    'x-component-props': {
      type: 'primary',
      htmlType: 'submit',
    },
  };
  return <ActionInitializerItem {...props} schema={schema} />;
};
