

import { genStyleHook } from '../__builtins__';

export const useActionPageStyle = genStyleHook('nb-action-page', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      position: 'absolute !important' as any,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: token.colorBgLayout,
      overflow: 'auto',

      '.ant-tabs-nav': {
        background: token.colorBgContainer,
        padding: `0 ${token.paddingPageVertical}px`,
        marginBottom: 0,
      },
      '.ant-tabs-content-holder': {
        padding: `${token.paddingPageVertical}px`,
        paddingBottom: '0px',
      },
    },
  };
});
