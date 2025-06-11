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
  Separator
} from '@chakra-ui/react';
import Play from './components/play';
import { ChakraDemo } from './components/ui/chakra-demo';
import { ArkDemo } from './components/ui/ark-demo';
import { Editor } from './app/Editor/Editor';
import { EditorWidgets } from './app/Editor/EditorWidgets';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack
      border={'1px solid'}
      borderColor={'border.muted'}
      shadow="xs"
      p="3"
      borderRadius={'md'}
    >
      <Heading margin='0'>{title}</Heading>
      <Separator />
      <Box pt={1}>
        {children}
      </Box>
    </Stack>
  );
}


export const Page = () => {
  return (
    <Container p={4} bg={'bg.panel'}>
      <Flex gap={8}>
        <Play hasActors={true} />

        {/*<Play />*/}

        <GridItem title="Chakra UI">
          <ChakraDemo />
        </GridItem>

        <GridItem title="Ark UI">
          <ArkDemo />

        </GridItem>


        <GridItem title="EditorWidgets">
          <Editor>
            <EditorWidgets />
          </Editor>

        </GridItem>




      </Flex>
    </Container>
  );
};
