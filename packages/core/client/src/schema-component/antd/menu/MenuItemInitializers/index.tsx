

import { genStyleHook } from '../../__builtins__/style';

export const useStyles = genStyleHook('nb-menu-item', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      paddingLeft: `${token.padding}px !important`,
      paddingRight: `${token.padding}px !important`,
    },
  };
});
