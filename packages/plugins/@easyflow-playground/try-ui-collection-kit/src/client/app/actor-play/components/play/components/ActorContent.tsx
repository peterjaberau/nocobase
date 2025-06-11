import { Card, Show } from '@chakra-ui/react';
import React from 'react';
import { ActorContentEmpty } from './ActorContentEmpty';

export const ActorContent = ({ children, hasActors = false }) => {
  return (
    <Card.Root border="none">
      <Card.Body p={2}>
        <Show when={hasActors} fallback={<ActorContentEmpty />}>
          {children}
        </Show>
      </Card.Body>
    </Card.Root>
  );
};
