

import { useParentRecordCommon } from '../../../useParentRecordCommon';
import { useGridCardBlockParams } from './useGridCardBlockParams';

export function useGridCardBlockDecoratorProps(props) {
  const { params, parseVariableLoading } = useGridCardBlockParams(props);
  let parentRecord;

  // 因为 association 是固定的，所以可以在条件中使用 hooks
  if (props.association) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    parentRecord = useParentRecordCommon(props.association);
  }

  return {
    params,
    parentRecord,
    /** 为 true 则表示正在解析 filter 参数中的变量 */
    parseVariableLoading,
  };
}
