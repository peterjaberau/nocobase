

import { useEffect } from 'react';
import { useGetAriaLabelOfDrawer } from './useGetAriaLabelOfDrawer';

export function useSetAriaLabelForDrawer(visible: boolean) {
  const { getAriaLabel } = useGetAriaLabelOfDrawer();

  // Because the Drawer setting aria-label is invalid, the following method is used to facilitate the selection of the e2e recording tool.
  useEffect(() => {
    if (visible) {
      // Because Action is rendered after clicking, it needs to be delayed
      setTimeout(() => {
        const wrappers = [...document.querySelectorAll('.ant-drawer-wrapper-body')];
        const masks = [...document.querySelectorAll('.ant-drawer-mask')];
        // If there are multiple masks, the last mask is the currently opened mask; the same is true for wrapper
        const currentMask = masks[masks.length - 1];
        const currentWrapper = wrappers[wrappers.length - 1];
        if (currentMask) {
          currentMask.setAttribute('role', 'button');
          currentMask.setAttribute('aria-label', getAriaLabel('mask'));
        }
        if (currentWrapper) {
          currentWrapper.setAttribute('role', 'button');
          // Set them all up and let the e2e recording tool choose by yourself
          currentWrapper.setAttribute('data-testid', getAriaLabel());
          currentWrapper.setAttribute('aria-label', getAriaLabel());
        }
      }, 0);
    }
  }, [getAriaLabel, visible]);
}
