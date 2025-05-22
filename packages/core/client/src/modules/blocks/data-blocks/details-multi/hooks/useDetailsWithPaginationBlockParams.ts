

import { useMemo } from 'react';
import { useParsedFilter } from '../../../../../block-provider/hooks/useParsedFilter';

export const useDetailsWithPaginationBlockParams = (props) => {
  const { params } = props;

  const { filter, parseVariableLoading } = useParsedFilter({
    filterOption: params?.filter,
  });

  const result = useMemo(() => {
    return { ...params, filter };
  }, [JSON.stringify(filter)]);

  return { params: result, parseVariableLoading };
};
