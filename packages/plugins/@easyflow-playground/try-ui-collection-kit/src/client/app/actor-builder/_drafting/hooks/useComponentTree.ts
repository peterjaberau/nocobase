import { useSelector } from '@xstate/react';
import { DraftContext } from '../draft.provider';

export function useComponentTree() {
  const componentTreeActorRef = DraftContext.useActorRef().system.get('component-tree');
  const componentTreeState: any = useSelector(componentTreeActorRef, (state) => state);

  const sendToComponentTree = componentTreeActorRef.send;



  return { componentTreeActorRef, componentTreeState, sendToComponentTree };

}
