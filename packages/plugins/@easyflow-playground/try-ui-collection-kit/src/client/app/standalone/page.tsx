import React from 'react';
import {
  Heading,
  SimpleGrid,
  Stack,
  Box,
  Container,
  Flex,
  Center,
  HStack,
  CheckboxCard,
} from '@chakra-ui/react';
import { ButtonRenderer, ButtonStories } from './_components/button';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack
      border={'1px solid'}
      borderColor={'border.muted'}
      shadow="xs"
      p="3"
      borderRadius={'md'}
    >
      <Heading>{title}</Heading>
      <Box>
        {children}
      </Box>
    </Stack>
  );
}


export const Page = () => {
  return (
    <Container p={4} bg={'bg.panel'}>
      <SimpleGrid columns={2} gap={4}>
        <GridItem title="Button">
          <ButtonRenderer colorPalette={'blue'} variant={'outline'}>
            Chakra Button
          </ButtonRenderer>
        </GridItem>

        <GridItem title="CheckboxCard">
          <CheckboxCard.Root maxW="240px">
            <CheckboxCard.HiddenInput />
            <CheckboxCard.Control>
              <CheckboxCard.Label>Next.js</CheckboxCard.Label>
              <CheckboxCard.Indicator />
            </CheckboxCard.Control>
          </CheckboxCard.Root>
        </GridItem>

        <GridItem title="Button Stories">
          <ButtonStories />
        </GridItem>



      </SimpleGrid>
    </Container>
  );
};
