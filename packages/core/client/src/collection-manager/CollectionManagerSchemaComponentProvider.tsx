

import React, { useMemo } from 'react';
import { SchemaComponentOptions } from '..';
import { CollectionProvider_deprecated } from './CollectionProvider_deprecated';
import { ResourceActionProvider, useDataSourceFromRAC } from './ResourceActionProvider';
import * as hooks from './action-hooks';
import { DataSourceProvider_deprecated, SubFieldDataSourceProvider_deprecated, ds } from './sub-table';

const components = {
  SubFieldDataSourceProvider_deprecated,
  DataSourceProvider_deprecated,
  CollectionProvider_deprecated,
  ResourceActionProvider,
};

export const CollectionManagerSchemaComponentProvider: React.FC = (props) => {
  const scope = useMemo(() => ({ cm: { ...hooks, useDataSourceFromRAC }, ds }), []);
  return (
    <SchemaComponentOptions scope={scope} components={components}>
      {props.children}
    </SchemaComponentOptions>
  );
};
