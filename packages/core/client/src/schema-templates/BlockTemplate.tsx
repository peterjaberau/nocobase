

import { observer, useField, useFieldSchema } from '@formily/react';
import React, { useMemo } from 'react';
import { BlockTemplateProvider, CollectionDeletedPlaceholder, RemoteSchemaComponent, useDesignable } from '..';
import { useTemplateBlockContext } from '../block-provider/TemplateBlockProvider';
import { useSchemaTemplateManager } from './SchemaTemplateManagerProvider';

export const BlockTemplate = observer(
  (props: any) => {
    const { templateId } = props;
    const { getTemplateById } = useSchemaTemplateManager();
    const field = useField();
    const fieldSchema = useFieldSchema();
    const { dn } = useDesignable();
    const template = useMemo(() => getTemplateById(templateId), [templateId]);
    const { onTemplateSuccess } = useTemplateBlockContext();

    const onSuccess = (data) => {
      fieldSchema['x-linkage-rules'] = data?.data?.['x-linkage-rules'] || [];
      fieldSchema.setProperties(data?.data?.properties);
      onTemplateSuccess?.();
    };
    return template ? (
      <BlockTemplateProvider {...{ dn, field, fieldSchema, template }}>
        <RemoteSchemaComponent noForm uid={template?.uid} onSuccess={onSuccess} />
      </BlockTemplateProvider>
    ) : (
      <CollectionDeletedPlaceholder type="Block template" name={templateId} />
    );
  },
  { displayName: 'BlockTemplate' },
);
