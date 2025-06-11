import React from 'react';

import {
  Stack,
  Collapsible,
} from '@chakra-ui/react';
import { ActorDeveloper } from './components/ActorDeveloper';
import { ActorToolbar } from './components/ActorToolbar';
import { ActorContent } from './components/ActorContent';
import { ActorHeader } from './components/ActorHeader';
import { ActorFooter } from './components/ActorFooter';
import { JsonViewPlugin } from './components/developer/JsonViewPlugin';
import { useSmartNode } from './hooks/useSmartNode';


export const Play = ({ hasActors = false }: any) => {
  const { smartNode } = useSmartNode();

  return (
    <Stack w="400px">
      <Stack backgroundColor="bg.panel" shadow="sm" borderRadius="sm">
        <Collapsible.Root w="full" defaultOpen={true}>
          <Collapsible.Trigger w="full">
            <ActorHeader title="Actor title" toolbar={<ActorToolbar />} />
          </Collapsible.Trigger>
          <Collapsible.Content>
            <ActorContent hasActors={hasActors}>actor content</ActorContent>
          </Collapsible.Content>
        </Collapsible.Root>
        <ActorFooter />
      </Stack>
      <ActorDeveloper hasActors={hasActors}><JsonViewPlugin /></ActorDeveloper>
    </Stack>
  );
};
