// hooks/useCurrentParams.ts
import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';

export const useCurrentParams = () => {
  const currentParamsRef = rootContext.useActorRef().system.get('currentParams');

  const currentParams = useSelector(currentParamsRef, (state) => state);
  const send = currentParamsRef.send;

  return {
    currentParams,
    send,
  };
};
