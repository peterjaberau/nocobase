// hooks/useCurrentParams.ts
import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';

export const useParams = () => {
  const paramsRef = rootContext.useActorRef().system.get('params');

  const stateParams = useSelector(paramsRef, (state) => state);
  const sendToParams = paramsRef.send;

  return {
    stateParams,
    sendToParams,
  };
};
