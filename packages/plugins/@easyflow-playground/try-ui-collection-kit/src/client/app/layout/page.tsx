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

import { Splitter } from './playground/_components/splitter'
import { ResizablePanel, ResizableHandle, ResizablePanelGroup } from './playground/_components/resizable';
// import { Splitter } from '@ark-ui/react'
import { chakra } from '@chakra-ui/react'

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

export const VSplitter = () => {
  return (
    <Splitter.Root orientation="vertical" panels={[{ id: 'aa' }, { id: 'bb' }]}>
      <Splitter.Panel id="aa">A</Splitter.Panel>
      <Splitter.ResizeTrigger id="aa:bb" aria-label="Resize" />
      <Splitter.Panel id="bb">B</Splitter.Panel>
    </Splitter.Root>
  );
}

export const Page = () => {
  return (
    <Container p={4} bg={'bg.panel'}>

      <Stack>

        <Splitter.Root
          orientation={'vertical'}
          panels={[
            { id: 'a' },
            { id: 'b' },
            { id: 'c' },
          ]}
          defaultSize={[20, 60, 20]}
        >
          <Splitter.Panel id="a">A</Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
          <Splitter.Panel id="b">B</Splitter.Panel>
          <Splitter.ResizeTrigger id="b:c" aria-label="Resize" />
          <Splitter.Panel id="c">C</Splitter.Panel>
        </Splitter.Root>

        <Splitter.Root
          panels={[
            { id: 'a', minSize: 20 },
            { id: 'b', minSize: 40 },
            { id: 'c', minSize: 20 },
          ]}
          defaultSize={[20, 60, 20]}
        >
          <Splitter.Panel id="a">A</Splitter.Panel>
          <Splitter.ResizeTrigger id="a:b" aria-label="Resize" />
          <Splitter.Panel id="b">B</Splitter.Panel>
          <Splitter.ResizeTrigger id="b:c" aria-label="Resize" />
          <Splitter.Panel id="c">
            <Splitter.Root
              orientation={'vertical'}
              panels={[
                { id: 'a' },
                { id: 'b' },
                { id: 'c' },
              ]}
              defaultSize={[20, 60, 20]}
            >
              <Splitter.Panel id="a">A</Splitter.Panel>
              <Splitter.ResizeTrigger height={'6px'} id="a:b" aria-label="Resize" />
              <Splitter.Panel id="b">B</Splitter.Panel>
              <Splitter.ResizeTrigger height={'6px'} id="b:c" aria-label="Resize" />
              <Splitter.Panel id="c">C</Splitter.Panel>
            </Splitter.Root>



          </Splitter.Panel>
        </Splitter.Root>






        <ResizablePanelGroup
          direction="horizontal"
          style={{
            minHeight: '200px',
            borderRadius: 'lg',
            border: '1px solid',
          }}
        >
          <ResizablePanel defaultSize={25}>
            <HStack p={6}>
              Sidebar
            </HStack>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <HStack p={6}>
              Content
            </HStack>
          </ResizablePanel>
        </ResizablePanelGroup>


        <SimpleGrid columns={2} gap={4}>
          <GridItem title="Button">
            test
          </GridItem>


          <GridItem title="Button Stories">
            test
          </GridItem>



        </SimpleGrid>


      </Stack>

    </Container>
  );
};
