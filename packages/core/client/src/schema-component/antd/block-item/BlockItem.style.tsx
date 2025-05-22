

import { genStyleHook } from '../__builtins__/style';

export const useStyles = genStyleHook('nb-block-item', (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      position: 'relative',
      '&:hover': {
        '> .general-schema-designer': {
          display: 'block',
        },
      },
      '&.nb-form-item:hover': {
        '> .general-schema-designer': {
          background: 'var(--colorBgSettingsHover) !important',
          border: '0 !important',
          top: '-5px !important',
          bottom: '-5px !important',
          left: '-5px !important',
          right: '-5px !important',
        },
      },
      '> .general-schema-designer': {
        position: 'absolute',
        zIndex: 999,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'none',
        border: '2px solid var(--colorBorderSettingsHover)',
        pointerEvents: 'none',
        '> .general-schema-designer-icons': {
          position: 'absolute',
          right: '2px',
          top: '2px',
          lineHeight: '16px',
          pointerEvents: 'all',
          '.ant-space-item': {
            backgroundColor: 'var(--colorSettings)',
            color: '#fff',
            lineHeight: '16px',
            width: '16px',
            paddingLeft: '1px',
            alignSelf: 'stretch',
          },
        },
      },

      '.ant-card': {
        borderRadius: token.borderRadiusBlock,
      },
    },
  };
});
