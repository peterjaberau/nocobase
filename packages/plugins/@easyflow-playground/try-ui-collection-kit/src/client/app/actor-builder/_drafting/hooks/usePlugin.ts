import { useSelector } from '@xstate/react';
import { DraftContext } from '../draft.provider';

export function usePlugin(actorRef) {
  const pluginActorRef = actorRef
  const pluginState: any = useSelector(actorRef, (state) => state);


  const sendToPlugin = actorRef.send;


  return { pluginActorRef, pluginState, sendToPlugin };
}
