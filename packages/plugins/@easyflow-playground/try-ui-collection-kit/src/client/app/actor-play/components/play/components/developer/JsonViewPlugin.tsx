import React from 'react';
import { useSmartNode } from '../../hooks/useSmartNode';

import JsonView from 'react18-json-view'

export const JsonViewPlugin = () => {
  const { smartNode } = useSmartNode();

  return <JsonView src={smartNode} collapsed={true} />;
  };
