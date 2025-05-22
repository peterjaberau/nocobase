

import { useField } from '@formily/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  GeneralSchemaDesigner,
  SchemaSettingsDivider,
  SchemaSettingsItem,
  SchemaSettingsRemove,
  SchemaSettingsRenderEngine,
} from '../../../schema-settings';
import { SchemaSettingsBlockHeightItem } from '../../../schema-settings/SchemaSettingsBlockHeightItem';

export const MarkdownVoidDesigner = () => {
  const field = useField();
  const { t } = useTranslation();
  return (
    <GeneralSchemaDesigner>
      <SchemaSettingsItem
        title={t('Edit markdown')}
        onClick={() => {
          field.editable = true;
        }}
      />
      <SchemaSettingsRenderEngine />
      <SchemaSettingsBlockHeightItem />
      <SchemaSettingsDivider />
      <SchemaSettingsRemove
        removeParentsIfNoChildren
        breakRemoveOn={{
          'x-component': 'Grid',
        }}
      />
    </GeneralSchemaDesigner>
  );
};
