import type { ActorRefFrom } from 'xstate';
import { createActorReferenceContext } from './hooks';
import { playgroundMachine } from './machine';

export const {
  ActorRefProvider: PlaygroundInstanceProvider,
  useActorRefContext: usePlaygroundActorRef,
  useActorRefSelector: usePlaygroundActorSelector,
} = createActorReferenceContext<ActorRefFrom<typeof playgroundMachine>>();

