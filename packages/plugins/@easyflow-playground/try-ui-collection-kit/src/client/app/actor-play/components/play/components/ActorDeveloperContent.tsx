import { Show } from '@chakra-ui/react';
import React from 'react';
import { ActorDeveloperContentEmpty } from './ActorDeveloperContentEmpty';

export const ActorDeveloperContent = ({ children, hasActors = false }) => {
  return (
    <Show when={hasActors} fallback={<ActorDeveloperContentEmpty />}>
      {children}
    </Show>
  );
};
