import React, { useCallback, useState } from 'react';
import { FieldTimeOutlined } from '@ant-design/icons';
import { DataBlockInitializer, SchemaInitializerItemType, useSchemaInitializer } from "@easyflow/client";

import { getTimelineSchema } from '../schema';
import { useT } from '../locale';
import { TimelineConfigFormProps, TimelineInitializerConfigForm } from './ConfigForm';
import { BlockName, BlockNameLowercase } from '../constants';

export const TimelineInitializerComponent = () => {
  const { insert } = useSchemaInitializer();
  const [collection, setCollection] = useState<string>();
  const [dataSource, setDataSource] = useState<string>();
  const [showConfigForm, setShowConfigForm] = useState(false);
  const t = useT()

  const onSubmit: TimelineConfigFormProps['onSubmit'] = useCallback((values) => {
    const schema = getTimelineSchema({ collection, dataSource, timeField: values.timeField, titleField: values.titleField });
    insert(schema);
  }, [collection, dataSource])

  return <>
    {showConfigForm && <TimelineInitializerConfigForm
      visible={showConfigForm}
      setVisible={setShowConfigForm}
      onSubmit={onSubmit}
      collection={collection}
      dataSource={dataSource}
    />}
    <DataBlockInitializer
      name={BlockNameLowercase}
      title={t(BlockName)}
      icon={<FieldTimeOutlined />}
      componentType={BlockName}
      onCreateBlockSchema={({ item }) => {
        const { name: collection, dataSource } = item;
        setCollection(collection);
        setDataSource(dataSource);
        setShowConfigForm(true);
      }}>

    </DataBlockInitializer>
  </>
}

export const timelineInitializerItem: SchemaInitializerItemType = {
  name: 'Timeline',
  Component: TimelineInitializerComponent,
}
