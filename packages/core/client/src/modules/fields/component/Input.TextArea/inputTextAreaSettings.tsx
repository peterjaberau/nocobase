

import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { ellipsisSettingsItem } from '../Input/inputComponentSettings';

export const inputTextAreaSettings = new SchemaSettings({
  name: 'fieldSettings:component:Input.TextArea',
  items: [ellipsisSettingsItem],
});
