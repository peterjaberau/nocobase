

import { UserCenterButton } from './UserCenterButton';
import { SchemaSettings } from '../../../application/schema-settings/SchemaSettings';
import { LanguageSettings } from './LanguageSettings';

const userCenterSettings = new SchemaSettings({
  name: 'userCenterSettings',
  Component: UserCenterButton,
  items: [
    {
      name: 'langue',
      Component: LanguageSettings,
      sort: 350,
    },
  ],
});

export { userCenterSettings };
