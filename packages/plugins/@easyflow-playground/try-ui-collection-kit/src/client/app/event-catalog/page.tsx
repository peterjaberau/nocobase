
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
import { EventCatalog } from './_components/event.catalog.component';

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
    <>
      <EventCatalog />
    </>
  )
};
