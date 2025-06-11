import { Card } from '@chakra-ui/react';
import React from 'react';
import { ActorDeveloperContent } from './ActorDeveloperContent';
import { ActorDeveloperHeader } from './ActorDeveloperHeader';
import { ActorDeveloperToolbar } from './ActorDeveloperToolbar';

export const ActorDeveloper = ({ children, hasActors = false }) => {
  return (
    <Card.Root>
      <Card.Header p="0">
        <ActorDeveloperHeader title="" toolbar={<ActorDeveloperToolbar />} />
      </Card.Header>
      <Card.Body p={2}>
        <ActorDeveloperContent hasActors={hasActors}>{children}</ActorDeveloperContent>
      </Card.Body>
    </Card.Root>
  );
};
