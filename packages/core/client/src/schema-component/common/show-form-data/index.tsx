

import React from 'react';
import { observer, useForm } from '@formily/react';

/**
 * show form data for doc demo
 * @internal
 */
export const ShowFormData = observer(({ children }) => {
  const form = useForm();
  return (
    <>
      {
        <pre style={{ marginBottom: 20 }} data-testid="form-data">
          {JSON.stringify(form.values, null, 2)}
        </pre>
      }
      {children}
    </>
  );
});
