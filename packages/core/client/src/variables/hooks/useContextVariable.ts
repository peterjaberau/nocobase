

import { useMemo } from 'react';
import { useTableBlockContextBasicValue } from '../../block-provider/TableBlockProvider';
import { useDataBlockRequestData } from '../../data-source';
import { useCollection } from '../../data-source/collection/CollectionProvider';
import { useCurrentPopupContext } from '../../schema-component/antd/page/PagePopups';
import { getStoredPopupContext } from '../../schema-component/antd/page/pagePopupUtils';
import { usePopupSettings } from '../../schema-component/antd/page/PopupSettingsProvider';
import { VariableOption } from '../types';

const useContextVariable = (): VariableOption => {
  let tableBlockContext;

  const { isPopupVisibleControlledByURL } = usePopupSettings();
  const { params } = useCurrentPopupContext();
  const collection = useCollection();
  const _blockData = useDataBlockRequestData();
  const tableBlockContextBasicValue = useTableBlockContextBasicValue() || {};

  if (isPopupVisibleControlledByURL()) {
    tableBlockContext = getStoredPopupContext(params?.popupuid)?.tableBlockContext;
  } else {
    tableBlockContext = { ...tableBlockContextBasicValue, collection, blockData: _blockData };
  }

  const { field, blockData, rowKey, collection: collectionName } = tableBlockContext || {};

  const contextData = useMemo(
    () => blockData?.data?.filter?.((v) => (field?.data?.selectedRowKeys || [])?.includes(v[rowKey])),
    [field?.data?.selectedRowKeys, rowKey, blockData],
  );

  return useMemo(() => {
    return {
      name: '$context',
      ctx: contextData || [],
      collectionName,
    };
  }, [collectionName, contextData]);
};

export default useContextVariable;
