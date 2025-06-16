import { useSelector } from '@xstate/react';
import { DraftContext } from '../draft.provider';


export const useDataChildren = () => {
  const actorRef = DraftContext.useActorRef().system.get('data-children');
  const state: any = useSelector(actorRef, (state) => state);

  const collection = state.context.items;
  const actorId = actorRef.id;
  const actorKeys = Object.keys(actorRef);

  // eg. represents an actor with last emitted value
  const snapshot = actorRef.getSnapshot();

  // eg. represents the state of the actor. can be used to persist in local storage
  const persistedSnapshot = actorRef.getPersistedSnapshot();


  return {
    actorRef,
    snapshot,
    persistedSnapshot,
    state,
    collection,
    actorId,
    actorKeys
  };
}
