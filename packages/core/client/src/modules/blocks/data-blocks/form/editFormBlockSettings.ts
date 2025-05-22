

import { useFieldSchema } from '@formily/react';
import { SchemaSettings } from '../../../../application/schema-settings/SchemaSettings';
import { useFormBlockContext } from '../../../../block-provider/FormBlockProvider';
import { useCollection_deprecated } from '../../../../collection-manager';
import { useCollection } from '../../../../data-source/collection/CollectionProvider';
import {
  SchemaSettingsDataTemplates,
  SchemaSettingsFormItemTemplate,
  SchemaSettingsLinkageRules,
} from '../../../../schema-settings';
import { SchemaSettingsBlockHeightItem } from '../../../../schema-settings/SchemaSettingsBlockHeightItem';
import { SchemaSettingsBlockTitleItem } from '../../../../schema-settings/SchemaSettingsBlockTitleItem';
import { useBlockTemplateContext } from '../../../../schema-templates/BlockTemplateProvider';
import { SchemaSettingsLayoutItem } from '../../../../schema-settings/SchemaSettingsLayoutItem';

export const editFormBlockSettings = new SchemaSettings({
  name: 'blockSettings:editForm',
  items: [
    {
      name: 'title',
      Component: SchemaSettingsBlockTitleItem,
    },
    {
      name: 'setTheBlockHeight',
      Component: SchemaSettingsBlockHeightItem,
    },
    {
      name: 'linkageRules',
      Component: SchemaSettingsLinkageRules,
      useComponentProps() {
        const { name } = useCollection_deprecated();
        return {
          collectionName: name,
        };
      },
    },
    {
      name: 'dataTemplates',
      Component: SchemaSettingsDataTemplates,
      useVisible() {
        const { action } = useFormBlockContext();
        return !action;
      },
      useComponentProps() {
        const { name } = useCollection_deprecated();
        return {
          collectionName: name,
        };
      },
    },
    {
      name: 'divider',
      type: 'divider',
    },
    {
      name: 'formItemTemplate',
      Component: SchemaSettingsFormItemTemplate,
      useComponentProps() {
        const { componentNamePrefix } = useBlockTemplateContext();
        const { name } = useCollection();
        const fieldSchema = useFieldSchema();
        const defaultResource =
          fieldSchema?.['x-decorator-props']?.resource || fieldSchema?.['x-decorator-props']?.association;
        return {
          componentName: `${componentNamePrefix}FormItem`,
          collectionName: name,
          resourceName: defaultResource,
        };
      },
    },
    {
      name: 'setBlockLayout',
      Component: SchemaSettingsLayoutItem,
    },
    {
      name: 'divider2',
      type: 'divider',
    },
    {
      name: 'remove',
      type: 'remove',
      componentProps: {
        removeParentsIfNoChildren: true,
        breakRemoveOn: {
          'x-component': 'Grid',
        },
      },
    },
  ],
});
