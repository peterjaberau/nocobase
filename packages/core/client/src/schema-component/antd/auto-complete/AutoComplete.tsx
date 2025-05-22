

import { connect, mapProps, mapReadPretty } from '@formily/react';
import { AutoComplete as AntdAutoComplete } from 'antd';
import { withDynamicSchemaProps } from '../../../hoc/withDynamicSchemaProps';
import { ReadPretty } from '../input';

export const AutoComplete = withDynamicSchemaProps(
  connect(
    AntdAutoComplete,
    mapProps({
      dataSource: 'options',
    }),
    mapReadPretty(ReadPretty.Input),
  ),
);
