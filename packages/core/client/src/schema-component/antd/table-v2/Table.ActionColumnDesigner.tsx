

import { DragOutlined } from '@ant-design/icons';
import { useFieldSchema } from '@formily/react';
import { Space } from 'antd';
import React from 'react';
import { useSchemaInitializerRender, useSchemaSettingsRender } from '../../../application';
import { DragHandler } from '../../../schema-component';
import { useGetAriaLabelOfDesigner } from '../../../schema-settings/hooks/useGetAriaLabelOfDesigner';

export const TableActionColumnDesigner = (props: any) => {
  const fieldSchema = useFieldSchema();
  const { render: renderInitializers } = useSchemaInitializerRender(
    fieldSchema['x-initializer'],
    fieldSchema['x-initializer-props'],
  );
  const { render: renderSettings } = useSchemaSettingsRender('fieldSettings:TableColumn');
  const { getAriaLabel } = useGetAriaLabelOfDesigner();
  return (
    <div className={'general-schema-designer'}>
      <div className={'general-schema-designer-icons'}>
        <Space size={2} align={'center'}>
          <DragHandler>
            <DragOutlined role="button" aria-label={getAriaLabel('drag-handler')} />
          </DragHandler>
          {renderInitializers()}
          {renderSettings()}
        </Space>
      </div>
    </div>
  );
};
