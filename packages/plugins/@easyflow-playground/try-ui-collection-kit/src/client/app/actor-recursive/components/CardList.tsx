import React from 'react';
import { useSelector } from '@xstate/react';
import { Card } from './Card';
import { useCardContext } from '../machine/CardContext';
import { Button, Stack, HStack, Text, Box } from '@chakra-ui/react';

export function CardList() {
  const { parentActor } = useCardContext();
  const cards = useSelector(parentActor, (state) => state.context.cards);

  const handleAddCard = () => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: 'New Card',
      content: 'Click edit to modify this card',
    };
    parentActor.send({ type: 'ADD_CARD', card: newCard });
  };

  return (
    <>
      <Stack>
        <HStack justify={'space-between'}>
          <Text textStyle={'xl'}>Card List</Text>
          <Button variant='outline' size="sm" onClick={handleAddCard}>
            Add Card
          </Button>
        </HStack>

        <Stack>
          {cards.map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
