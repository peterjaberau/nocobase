import { SchemaSettingsItemType, useDesignable, } from "@easyflow/client";
import { useFieldSchema } from '@formily/react';
import { useT } from "../../locale";
import { BlockNameLowercase } from "../../constants";

export const objectFitSchemaSettingsItem: SchemaSettingsItemType = {
  name: 'objectFit',
  type: 'select',
  useComponentProps() {
    const filedSchema = useFieldSchema();
    const { deepMerge } = useDesignable();
    const t = useT();

    return {
      title: t('Object Fit'),
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
        { label: 'Fill', value: 'fill' },
        { label: 'None', value: 'none' },
        { label: 'Scale Down', value: 'scale-down' },
      ],
      value: filedSchema['x-decorator-props']?.[BlockNameLowercase]?.objectFit || 'cover',
      onChange(v) {
        deepMerge({
          'x-uid': filedSchema['x-uid'],
          'x-decorator-props': {
            ...filedSchema['x-decorator-props'],
            [BlockNameLowercase]: {
              ...filedSchema['x-decorator-props']?.[BlockNameLowercase],
              objectFit: v,
            },
          },
        })
      },
    };
  },
};
