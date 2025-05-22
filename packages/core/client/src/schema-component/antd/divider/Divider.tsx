

import { connect, mapProps } from '@formily/react';
import { Divider as AntdDivider } from 'antd';
import React from 'react';

export const Divider = connect(
  (props) => {
    const { color, borderColor } = props;
    return <AntdDivider {...props} type="horizontal" style={{ color, borderColor }} orientationMargin="0" />;
  },
  mapProps((props) => {
    return {
      orientation: 'left',
      ...props,
    };
  }),
);

export default Divider;
