
import React from 'react';
import { connect } from '@formily/react';

import { useCollectionRecordData } from '../../../data-source';
import { Upload } from '../upload/Upload';

/**
 * @deprecated
 * Only used for file collection preview field.
 * For file object preview, please use `Upload.ReadPretty` instead.
 */
export const Preview = connect((props) => {
  const data = useCollectionRecordData();
  return <Upload.ReadPretty {...props} value={data} />;
});

export default Preview;
