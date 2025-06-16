import { ActorRefLike, AnyActorRef, AnyMachineSnapshot, AnyStateMachine, AnyStateNode } from 'xstate';

// export function isActorRef(actorRefLike: ActorRefLike): actorRefLike is AnyActorRef {
//   return 'src' in actorRefLike && 'system' in actorRefLike && 'sessionId' in actorRefLike;
// }

export function isActorRef(actorRef: any): actorRef is AnyActorRef {
  return (
    typeof actorRef === 'object' &&
    actorRef !== null &&
    typeof actorRef.sessionId === 'string' &&
    typeof actorRef.send === 'function'
  );
}


export function isMachineActor(actor: ActorRefLike): actor is typeof actor & { src: AnyStateMachine } {
  return 'src' in actor && typeof actor.src === 'object' && actor.src !== null && 'definition' in actor.src;
}


export const isNode =
  typeof process !== 'undefined' &&
  typeof process.versions?.node !== 'undefined' &&
  typeof document === 'undefined';
