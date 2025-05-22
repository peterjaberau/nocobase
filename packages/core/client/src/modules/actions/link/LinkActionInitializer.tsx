

import React from 'react';
import { useSchemaInitializerItem } from '../../../application';
import { BlockInitializer } from '../../../schema-initializer/items';

export const LinkActionInitializer = (props) => {
  const schema = {
    type: 'void',
    title: '{{ t("Link") }}',
    'x-action': 'customize:link',
    'x-toolbar': 'ActionSchemaToolbar',
    'x-settings': 'actionSettings:link',
    'x-component': props?.['x-component'] || 'Action.Link',
    'x-use-component-props': 'useLinkActionProps',
    'x-decorator': 'ACLActionProvider',
  };

  const itemConfig = useSchemaInitializerItem();
  return <BlockInitializer {...itemConfig} schema={schema} item={itemConfig} />;
};
