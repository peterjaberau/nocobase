import React from 'react';
import { useSelector } from '@xstate/react';
import { AnyActorRef } from 'xstate';
import { Input, Button, Stack, Textarea, HStack, Text, Box, Card as ChakraCard, Collapsible } from '@chakra-ui/react';

type CardEditProps = {
  actor: AnyActorRef;
};

export function CardEdit({ actor }: CardEditProps) {
  const editData = useSelector(actor, (state) => state.context.editData);
  const currentState = useSelector(actor, (state) => state.value);

  if (!editData) return null;

  const handleFieldChange = (field: 'title' | 'content', value: string) => {
    actor.send({ type: 'UPDATE_FIELD', field, value });
  };

  return (
    <Box>
      <HStack>
        <Input value={editData.title} onChange={(e) => handleFieldChange('title', e.target.value)} />
        <HStack>
          <Button variant={'outline'} onClick={() => actor.send({ type: 'SAVE' })}>
            SAVE
          </Button>
          <Button variant={'outline'} onClick={() => actor.send({ type: 'CANCEL' })}>
            Close
          </Button>
        </HStack>
      </HStack>
      <Textarea value={editData.content} onChange={(e) => handleFieldChange('content', e.target.value)} rows={3} />
      <HStack>
        <Box>State: {currentState as string}</Box>
        <Box>Actor ID: {actor.id}</Box>
      </HStack>
    </Box>
  );
}
