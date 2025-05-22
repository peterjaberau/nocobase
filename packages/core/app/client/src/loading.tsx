

import React from 'react';
import { Spin } from 'antd';

export default function Loading() {
  return (
    <Spin
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}
