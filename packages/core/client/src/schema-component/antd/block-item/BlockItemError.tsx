

import React, { FC } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { SchemaSettings } from '../../../application/schema-settings/SchemaSettings';
import { SchemaToolbar } from '../../../schema-settings/GeneralSchemaDesigner';
import { ErrorFallback } from '../error-fallback';
import { BlockItemCard } from './BlockItemCard';

const blockDeleteSettings = new SchemaSettings({
  name: 'blockDeleteSettings',
  items: [
    {
      name: 'remove',
      type: 'remove',
      componentProps: {
        removeParentsIfNoChildren: true,
        breakRemoveOn(s) {
          return s['x-component'] === 'Grid'; // 其顶级是 Grid，这一层级不能删
        },
      },
    },
  ],
});

const FallbackComponent: FC<FallbackProps> = (props) => {
  return (
    <BlockItemCard>
      <SchemaToolbar settings={blockDeleteSettings} draggable={false} />
      <ErrorFallback {...props} />
    </BlockItemCard>
  );
};

export const BlockItemError: FC = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={console.error}>
      {children}
    </ErrorBoundary>
  );
};
