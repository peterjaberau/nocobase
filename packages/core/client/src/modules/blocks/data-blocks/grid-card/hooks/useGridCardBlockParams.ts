

import { useMemo } from 'react';
import { useParsedFilter } from '../../../../../block-provider/hooks/useParsedFilter';

export function useGridCardBlockParams(props) {
  const { params } = props;
  const { filter: parsedFilter, parseVariableLoading } = useParsedFilter({
    filterOption: params?.filter,
  });
  const paramsWithFilter = useMemo(() => {
    return {
      ...params,
      filter: parsedFilter,
    };
  }, [parsedFilter, params]);

  return { params: paramsWithFilter, parseVariableLoading };
}
