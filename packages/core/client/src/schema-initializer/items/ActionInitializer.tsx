

import React from 'react';

import { useSchemaInitializerItem } from '../../application';
import { InitializerWithSwitch } from './InitializerWithSwitch';

/**
 * @deprecated
 * use ActionInitializerItem instead
 * @param props
 * @returns
 */
export const ActionInitializer = (props) => {
  const itemConfig = useSchemaInitializerItem();
  return <InitializerWithSwitch {...itemConfig} {...props} item={itemConfig} type={'x-action'} />;
};
