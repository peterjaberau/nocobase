

import { connect, mapReadPretty } from '@formily/react';
import { Action } from '../action';
import { Editable } from './Editable';
import { FileSelector } from './FileManager';
import { InternalPicker } from './InternalPicker';
import { Nester } from './Nester';
import { ReadPretty } from './ReadPretty';
import { SubTable } from './SubTable';
import { AssociationFieldAddNewer } from './AssociationSelect';

export {
  AssociationFieldMode,
  AssociationFieldModeProvider,
  useAssociationFieldModeContext,
} from './AssociationFieldModeProvider';

export const AssociationField: any = connect(Editable, mapReadPretty(ReadPretty));

AssociationField.SubTable = SubTable;
AssociationField.Nester = Nester;
AssociationField.AddNewer = AssociationFieldAddNewer;
AssociationField.Selector = Action.Container;
AssociationField.Viewer = Action.Container;
AssociationField.InternalSelect = InternalPicker;
AssociationField.ReadPretty = ReadPretty;
AssociationField.FileSelector = FileSelector;

export { useAssociationFieldContext } from './hooks';
