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
import { Stories } from './app/components/stories';
import { Simulator } from './app/components/simulator';

const GridItem = ({ title, children, ...rest }: any) => {
  return (
    <Stack
      border={'1px solid'}
      borderColor={'border.muted'}
      shadow="xs"
      p="3"
      borderRadius={'md'}
      {...rest}
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
    <Container p={4} bg='bg.panel' fluid>
      <Flex justify="flex-start" gap={4}>
        <GridItem title="Stories" w='200px'>
          <Stories  />
        </GridItem>

        <GridItem title="Simulator">
          <Simulator  />
        </GridItem>

      </Flex>
    </Container>
  );
};
