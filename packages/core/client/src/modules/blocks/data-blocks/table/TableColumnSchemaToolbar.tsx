

import _ from 'lodash';
import React from 'react';
import { GridRowContext } from '../../../../schema-component/antd/grid/Grid';
import { SchemaToolbar } from '../../../../schema-settings';

export const TableColumnSchemaToolbar = React.memo((props: any) => {
  return (
    <GridRowContext.Provider value={null}>
      <SchemaToolbar
        initializer={props.initializer || false}
        showBorder={false}
        showBackground
        {..._.omit(props, 'initializer')}
      />
    </GridRowContext.Provider>
  );
});

TableColumnSchemaToolbar.displayName = 'TableColumnSchemaToolbar';
