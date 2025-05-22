

import React, { useMemo } from 'react';
import { Templates } from '../..';
import { useFormBlockContext } from '../../../block-provider/FormBlockProvider';
import { withDynamicSchemaProps } from '../../../hoc/withDynamicSchemaProps';
import { withSkeletonComponent } from '../../../hoc/withSkeletonComponent';
import { useToken } from '../../../style';
import { Form } from './Form';

export const FormWithDataTemplates: any = withDynamicSchemaProps(
  withSkeletonComponent((props) => {
    const formBlockCtx = useFormBlockContext();
    const { token } = useToken();
    const style = useMemo(() => ({ marginBottom: token.margin }), [token.margin]);
    return (
      <>
        <Templates style={style} form={props.form || formBlockCtx?.form} />
        <Form {...props} />
      </>
    );
  }),
);

FormWithDataTemplates.displayName = 'FormWithDataTemplates';
