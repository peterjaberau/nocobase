

import { DragOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import { DragHandler, useDesignable } from '../..';
import { useSchemaSettingsRender } from '../../../application/schema-settings/hooks/useSchemaSettingsRender';
import { SchemaToolbarProvider } from '../../../application/schema-toolbar/context';
import { SchemaToolbar } from '../../../schema-settings/GeneralSchemaDesigner';
import { useGetAriaLabelOfDesigner } from '../../../schema-settings/hooks/useGetAriaLabelOfDesigner';

export const PageDesigner = ({ title }) => {
  const { designable } = useDesignable();

  if (!designable) {
    return null;
  }

  return (
    <SchemaToolbarProvider title={title}>
      <SchemaToolbar settings="PageSettings" showBorder={false} />
    </SchemaToolbarProvider>
  );
};

export const PageTabDesigner = () => {
  const { designable } = useDesignable();
  const { getAriaLabel } = useGetAriaLabelOfDesigner();
  const { render } = useSchemaSettingsRender('PageTabSettings');

  if (!designable) {
    return null;
  }

  return (
    <div className={'general-schema-designer'}>
      <div className={'general-schema-designer-icons'}>
        <Space size={3} align={'center'}>
          <DragHandler>
            <DragOutlined style={{ marginRight: 0 }} role="button" aria-label={getAriaLabel('drag-handler', 'tab')} />
          </DragHandler>
          {render()}
        </Space>
      </div>
    </div>
  );
};
