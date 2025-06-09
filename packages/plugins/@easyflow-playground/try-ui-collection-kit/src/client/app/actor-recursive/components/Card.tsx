import React from 'react';
import { useSelector } from '@xstate/react';
import { CardEdit } from './CardEdit';
import { useCardContext } from '../machine/CardContext';
import { Button, Stack, HStack, Text, Box, Card as ChakraCard, Collapsible } from '@chakra-ui/react';

export function Card({ data }: any) {
  const { parentActor } = useCardContext();
  const childActors = useSelector(parentActor, (state: any) => state.context.childActors);
  const actor = childActors.get(data.id);

  if (!actor) {
    return null;
  }

  const isExpanded = useSelector(actor, (state: any) => state.context.isExpanded);
  const isEditing = useSelector(actor, (state: any) => state.context.isEditing);
  const currentData = useSelector(actor, (state: any) => state.context.data);
  const currentState = useSelector(actor, (state: any) => state.value);
  const childCards = useSelector(actor, (state: any) => state.context.childCards);
  const snapshot = actor.getSnapshot();

  if (isEditing) {
    return <CardEdit actor={actor} />;
  }

  return (
    <>
      <ChakraCard.Root>
        <ChakraCard.Header>
          <HStack justify={'space-between'}>
            <ChakraCard.Title>
              {currentData.title} <span>Actor ID: {actor.id}</span>
            </ChakraCard.Title>
            <HStack flex={1} alignItems={'flex-end'}></HStack>
            <HStack>
              <Button variant={'outline'} size={'xs'} onClick={() => actor.send({ type: 'ADD_CHILD' })}>
                + child
              </Button>
              <Button size={'xs'} variant={'outline'} onClick={() => actor.send({ type: 'EDIT' })}>
                edit
              </Button>
              <Button size={'xs'} variant={'outline'} onClick={() => actor.send({ type: 'TOGGLE_EXPAND' })}>
                {isExpanded ? 'collapse' : 'expand'}
              </Button>
              <Button
                size={'xs'}
                variant={'outline'}
                onClick={() => console.log(`Inspect Actor:${actor.id} ---`, actor)}
              >
                inspect
              </Button>
            </HStack>
          </HStack>
        </ChakraCard.Header>
        <ChakraCard.Body>
          <Stack>
            <Text textStyle={'xl'}>{currentData.content}</Text>
            {isExpanded && (
              <>
                {childCards.length > 0 && (
                  <Stack>
                    {childCards.map((childCard: any) => (
                      <Card key={`item${childCard.id}`} data={childCard} />
                    ))}
                  </Stack>
                )}
              </>
            )}

            <Collapsible.Root>
              <Collapsible.Trigger paddingY="3">
                <h5>Actor State and Snapshot</h5>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <Stack>
                  <Text textStyle={'xl'}>Current State: {currentState as string}</Text>
                  <pre>{JSON.stringify(snapshot, null, 2)}</pre>
                </Stack>
              </Collapsible.Content>
            </Collapsible.Root>
          </Stack>
        </ChakraCard.Body>
      </ChakraCard.Root>
    </>
  );
}
