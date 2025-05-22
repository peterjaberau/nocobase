

import { useEffect } from 'react';
import { useGetAriaLabelOfModal } from './useGetAriaLabelOfModal';

export function useSetAriaLabelForModal(visible: boolean) {
  const { getAriaLabel } = useGetAriaLabelOfModal();

  // Because the Drawer setting aria-label is invalid, the following method is used to facilitate the selection of the e2e recording tool.
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        const wrappers = [...document.querySelectorAll('.ant-modal-content')];
        const masks = [...document.querySelectorAll('.ant-modal-wrap')];
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
      });
    }
  }, [getAriaLabel, visible]);
}
