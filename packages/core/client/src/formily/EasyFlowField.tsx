

import { FieldContext, IFieldProps, JSXComponent, Schema, useFieldSchema } from '@formily/react';
import React, { useMemo } from 'react';
import { useCompile } from '../schema-component/hooks/useCompile';
import { EasyFlowReactiveField } from './EasyFlowReactiveField';
import { createEasyFlowField } from './createEasyFlowField';

/**
 * To maintain high performance of Table, this component removes Formily-related components
 * @param props component props
 * @returns
 */
export const EasyFlowField = <D extends JSXComponent, C extends JSXComponent>(
  props: IFieldProps<D, C> & { schema: Schema },
) => {
  const compile = useCompile();
  const fieldSchema = useFieldSchema();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const field = useMemo(() => createEasyFlowField({ ...props, compile }), []);

  // update componentProps to rerender field component
  Object.assign(field.componentProps, fieldSchema['x-component-props']);
  field.value = props.value;

  return (
    <FieldContext.Provider value={field as any}>
      <EasyFlowReactiveField field={field as any}>{props.children}</EasyFlowReactiveField>
    </FieldContext.Provider>
  );
};
