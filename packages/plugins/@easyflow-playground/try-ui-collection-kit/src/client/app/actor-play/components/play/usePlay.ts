import { useSelector } from '@xstate/react';
import { playContext } from '../PlayContext';

export const usePlay = () => {
  const playRef = playContext.useActorRef();
  const playSelector = useSelector(playRef, (state) => state);

  const sendToPlay = playRef.send;

  return {
    sendToPlay
    playSelector
  }
};
