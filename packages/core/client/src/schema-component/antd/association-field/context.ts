

import { GeneralField } from '@formily/core';
import { Schema } from '@formily/react';
import { createContext } from 'react';

export interface AssociationFieldContextProps {
  options?: any;
  field?: GeneralField;
  fieldSchema?: Schema;
  currentMode?: string;
  allowMultiple?: boolean;
  allowDissociate?: boolean;
}

export const AssociationFieldContext = createContext<AssociationFieldContextProps>({});
AssociationFieldContext.displayName = 'AssociationFieldContext';
