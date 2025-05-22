

import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { ellipsisSettingsItem } from '../Input/inputComponentSettings';

export const markdownSettings = new SchemaSettings({
  name: 'fieldSettings:component:Markdown',
  items: [ellipsisSettingsItem],
});
