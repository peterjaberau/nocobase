

import { Spin, SpinProps } from 'antd';
import _ from 'lodash';
import React from 'react';

const opacityStyle = {
  opacity: 0.5,
};

const containerStyle: any = { position: 'relative' };

const spinStyle: any = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  left: 0,
  right: 0,
  height: '100%',
  maxHeight: 400,
  zIndex: 1000,
};

const displayNone = {
  display: 'none',
};

/**
 * Compared to antd's Spin, this component can significantly reduce browser style recalculation time
 */
export const HighPerformanceSpin = React.memo((props: SpinProps) => {
  return (
    <div style={containerStyle}>
      <Spin {..._.omit(props, 'children')} style={props.spinning ? spinStyle : displayNone} />
      <div style={props.spinning ? opacityStyle : null}>{props.children}</div>
    </div>
  );
});
