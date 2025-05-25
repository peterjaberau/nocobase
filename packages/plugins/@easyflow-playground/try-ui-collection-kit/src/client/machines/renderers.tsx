import React from 'react';
import { useActorRef } from '@xstate/react';
import { ActorOptions, AnyActorLogic } from 'xstate';
import { playgroundMachine } from './machine';
import { PlaygroundInstanceProvider } from './context';

interface AppInstanceRendererProps {
  children: React.ReactNode;
  actorOptions: ActorOptions<AnyActorLogic> | undefined | any;
}

export const PlaygroundInstanceRenderer = ({
  children,
  actorOptions,
}: AppInstanceRendererProps) => {
  const playgroundActorRef = useActorRef(playgroundMachine, actorOptions);
  return (
    <PlaygroundInstanceProvider value={playgroundActorRef}>{children}</PlaygroundInstanceProvider>
  );
};
