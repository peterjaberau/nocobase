import { defineSlotRecipe } from '@chakra-ui/react';
import { splitterAnatomy } from '@ark-ui/react';

export const splitterSlotRecipe = defineSlotRecipe({
  className: 'splitter',
  slots: splitterAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      gap: '2',
    },
    panel: {
      borderWidth: '1px',
      background: 'bg.panel',
      borderRadius: 'l2',
      color: 'fg.muted',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:has(.splitter__root)': {},
    },
    resizeTrigger: {
      borderRadius: 'full',
      transitionDuration: 'normal',
      transitionProperty: 'background',
      transitionTimingFunction: 'default',
      outline: '0',
      background: 'bg.muted',
      _hover: {
        background: 'bg.emphasized',
      },
      _active: {
        background: 'bg.emphasized',
      },
      _horizontal: {
        minWidth: '6px',
        margin: 'min(1rem, 20%) 0',
      },
      '&[data-scope=splitter][data-part=resize-trigger][data-orientation=vertical]': {
        height: '6px',
        minHeight: '6px',
        margin: '0 min(1rem, 20%)',
      },


      '&[data-orientation=vertical]': {
        height: '6px',
        minHeight: '6px',
        margin: '0 min(1rem, 20%)',
      },

      // _vertical: {
      //   height: '6px',
      //   minHeight: '6px',
      //   margin: '0 min(1rem, 20%)',
      // },
    },
  },
});
