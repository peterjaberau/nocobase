

import { useEffect } from 'react';
import { useGetAriaLabelOfPopover } from './useGetAriaLabelOfPopover';

export function useSetAriaLabelForPopover(visible: boolean) {
  const { getAriaLabel } = useGetAriaLabelOfPopover();

  // Because Popover setting aria-label is invalid, the following method is used to facilitate the selection of the e2e recording tool.
  useEffect(() => {
    if (visible) {
      const wrappers = [...document.querySelectorAll('.ant-popover-content')];
      const currentWrapper = wrappers[wrappers.length - 1];
      if (currentWrapper) {
        currentWrapper.setAttribute('role', 'button');
        // Set them all up and let the e2e recording tool choose by yourself
        currentWrapper.setAttribute('data-testid', getAriaLabel());
        currentWrapper.setAttribute('aria-label', getAriaLabel());
      }
    }
  }, [getAriaLabel, visible]);
}
