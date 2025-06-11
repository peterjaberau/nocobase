import { useSelector } from '@xstate/react';
import useRootMachine from './useRootMachine';

const useChildMachine = (childId) => {
  const rootMachine: any = useRootMachine();
  return useSelector(rootMachine, (state: any) => state.children[childId]);
};

export default useChildMachine;
