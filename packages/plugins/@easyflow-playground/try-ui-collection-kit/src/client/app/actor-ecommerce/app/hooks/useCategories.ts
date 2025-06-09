import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import { useCurrentParams } from './useCurrentParams';



export const useCategories = () => {
  const { currentParams, send: sendToParams }: any = useCurrentParams();

  const categoriesRef = rootContext.useActorRef().system.get('categories');
  const categories = useSelector(categoriesRef, (state) => state);

  const isSelected = (name: string) => currentParams.context?.category?.name === name;

  const changeCategory = (name: string) => {
    sendToParams({ type: 'CATEGORY_CHANGE', category: { name } });
  };

  return {
    categories,
    isSelected,
    changeCategory,
  };
};
