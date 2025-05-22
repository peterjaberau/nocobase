

import { genStyleHook } from '../../../schema-component/antd/__builtins__/style';

export const useStyles = genStyleHook('nb-array-collapse', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      marginBottom: '10px',
    },
  };
});
