import { useSelector } from '@xstate/react';
import { DraftContext } from '../draft.provider';


export const useSpawnedChildren = () => {
  const actorRef = DraftContext.useActorRef().system.get('spawned-children');
  const state: any = useSelector(actorRef, (state) => state);

  const collection = state.context.items || [];
  const actorId = actorRef.id;
  const actorKeys = Object.keys(actorRef);
  const stateValue = state.value;
  const status = state.status;

  const snapshot = actorRef.getSnapshot();
  const persistedSnapshot = actorRef.getPersistedSnapshot();
  const systemKeys = Object.keys(actorRef.system);
  // const allSpawned = state.children;

  return {
    stateValue,
    status,
    actorRef,
    snapshot,
    persistedSnapshot,
    state,
    collection,
    actorId,
    actorKeys,
    // allSpawned
  };
}
