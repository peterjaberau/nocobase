import React from 'react';
import { createActor } from 'xstate';
import { CardList } from './components/CardList';
import { CardContext } from './machine/CardContext';
import { parentCardMachine } from './machine/cardMachine';

import { Heading, SimpleGrid, Stack, Box, Container, Flex, Center, HStack, CheckboxCard } from '@chakra-ui/react';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack border={'1px solid'} borderColor={'border.muted'} shadow="xs" p="3" borderRadius={'md'}>
      <Heading>{title}</Heading>
      <Box>{children}</Box>
    </Stack>
  );
};

export const Page = () => {
  const parentActor = createActor(parentCardMachine).start();

  return (
    <Container p={4} bg={'bg.panel'}>
      <CardContext.Provider value={{ parentActor }}>
        <SimpleGrid columns={1} gap={4}>
          <GridItem title="Button">
            <CardList />
          </GridItem>
        </SimpleGrid>
      </CardContext.Provider>
    </Container>
  );
};
