

import { observer, useField, useFieldSchema } from '@formily/react';
import React, { useEffect } from 'react';
import { useCollection_deprecated } from '../../../collection-manager';
import { useCompile } from '../../hooks';

export const FormField: any = observer(
  (props) => {
    const fieldSchema = useFieldSchema();
    const { getField } = useCollection_deprecated();
    const field = useField();
    const collectionField = getField(fieldSchema.name);
    const compile = useCompile();
    useEffect(() => {
      if (!field.title) {
        field.title = compile(collectionField?.uiSchema?.title);
      }
    }, []);
    return <div>{props.children}</div>;
  },
  { displayName: 'FormField' },
);
