

import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { ellipsisSettingsItem } from '../Input/inputComponentSettings';

export const richTextSettings = new SchemaSettings({
  name: 'fieldSettings:component:RichText',
  items: [ellipsisSettingsItem],
});
