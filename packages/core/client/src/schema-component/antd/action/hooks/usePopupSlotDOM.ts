

import { useCallback, useMemo } from 'react';

/**
 * Used to get the DOM container for rendering popups or subpages.
 * @returns
 */
export const usePopupOrSubpagesContainerDOM = () => {
  const containerDOM: HTMLElement = useMemo(
    () => document.querySelector('.nb-subpages-slot-without-header-and-side'),
    [],
  );
  const getContainerDOM = useCallback(() => containerDOM, [containerDOM]);

  return { getContainerDOM };
};
