import { useSelector } from '@xstate/react';
import { DraftContext } from '../draft.provider';

export const useDataSpawnedChildren = () => {
  const actorRef = DraftContext.useActorRef().system.get('data-spawned-children');
  const state: any = useSelector(actorRef, (state) => state);

  const collection = state.context.items;
  const actorId = actorRef.id;
  const actorKeys = Object.keys(actorRef);

  const snapshot = actorRef.getSnapshot();
  const persistedSnapshot = actorRef.getPersistedSnapshot();

  return {
    actorRef,
    snapshot,
    persistedSnapshot,
    state,
    collection,
    actorId,
    actorKeys,
  };
};
