import { useSelector } from '@xstate/react';
import { SearchContext } from '../common/search';

export const useSearch = () => {
  const searchRef = SearchContext.useActorRef();
  const searchContext = useSelector(searchRef, (state: any) => state.context);
  const searchStateValue = useSelector(searchRef, (state: any) => state.value);

  const sendToSearch = searchRef.send;
  const fireSearchQueryChange = (query) => sendToSearch({ type: 'QUERY_CHANGE', query });

  return {
    searchRef,
    searchContext,
    searchStateValue,
    sendToSearch,
    fireSearchQueryChange,
  };
};
