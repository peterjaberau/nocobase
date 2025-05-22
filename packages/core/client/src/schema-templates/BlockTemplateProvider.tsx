

import { ISchema } from '@formily/json-schema';
import React, { createContext, FC, useContext } from 'react';

interface BlockTemplateProviderProps {
  /**
   * 为模板中的 componentName 参数设置一个前缀，用于实现相同区块的模板在不同的上下文中不会互相引用
   */
  componentNamePrefix?: string;
  dn?: any;
  field?: any;
  fieldSchema?: ISchema;
  template?: any;
}

export const BlockTemplateContext = createContext<BlockTemplateProviderProps>({ componentNamePrefix: '' });

export const BlockTemplateProvider: FC<BlockTemplateProviderProps> = (props) => {
  return (
    <BlockTemplateContext.Provider value={{ ...props, componentNamePrefix: props.componentNamePrefix || '' }}>
      {props.children}
    </BlockTemplateContext.Provider>
  );
};
export const useBlockTemplateContext = () => {
  return useContext(BlockTemplateContext);
};
