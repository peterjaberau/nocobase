

import { createContext } from 'react';
import { SelectWithTitle } from '../common';

export const SettingsMenuProvider = (props) => {
  return SelectWithTitle;
};

export const DropdownVisibleContext = createContext(null);
DropdownVisibleContext.displayName = 'DropdownVisibleContext';
