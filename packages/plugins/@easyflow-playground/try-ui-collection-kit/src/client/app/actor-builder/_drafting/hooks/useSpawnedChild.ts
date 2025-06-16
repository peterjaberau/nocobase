import { useSelector } from '@xstate/react';
import { DraftContext } from '../draft.provider';

export const useSpawnedChild = ({ childId }) => {
  const actorRef = DraftContext.useActorRef().system.get(childId);
  const state: any = useSelector(actorRef, (state) => state);

  const collectionItem = state.context || null;
  const actorId = actorRef.id;
  const actorKeys = Object.keys(actorRef);
  const stateValue = state.value;
  const status = state.status;
  //
  const snapshot = actorRef.getSnapshot();
  const persistedSnapshot = actorRef.getPersistedSnapshot();

  const systemKeys = Object.keys(actorRef.system);

  // return {
  //   stateValue,
  //   status,
  //   snapshot,
  //   persistedSnapshot,
  //   state,
  //   collectionItem,
  //   actorId,
  //   actorKeys,
  // }

  return {
    childId,
    actorRef,
    state,
    collectionItem,
    stateValue,
    status,
    snapshot,
    persistedSnapshot,
    actorId,
    actorKeys,
  }
}
