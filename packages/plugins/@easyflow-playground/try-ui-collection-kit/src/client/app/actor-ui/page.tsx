import React from 'react';
import {
  Button,
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

import * as FormActor from './actors/form';
import { useActor } from '@xstate/react';
import {
  InputTextInvoke,
  InputTextSendParent,
  InputTextSendTo,
  InputTextWithActor,
  InputText,
  InputTextSharedMachine,
} from './components/input-text';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack border={'1px solid'} borderColor={'border.muted'} shadow="xs" p="3" borderRadius={'md'}>
      <Heading>{title}</Heading>
      <Box>{children}</Box>
    </Stack>
  );
};

export const Page = () => {
  const [snapshotInvoke, sendInvoke] = useActor(FormActor.actorInvoke);
  const [snapshotParent, sendParent] = useActor(FormActor.actorSendParent);
  const [snapshotWithRef, sendWithRef] = useActor(FormActor.actorWithRef);
  const [snapshotSendTo, sendSendTo] = useActor(FormActor.actorSendTo);
  const [snapshotWithValue, sendWithValue] = useActor(FormActor.actorWithValue);

  return (
    <Container p={4} bg={'bg.panel'}>
      <SimpleGrid columns={2} gap={4}>
        <GridItem title="Passing onChange and value props">
          <form action={() => sendWithValue({ type: 'submit' })}>
            <HStack gap={2}>
              <InputText
                value={snapshotWithValue.context.text}
                onChange={(value) => sendWithValue({ type: 'change', value })}
              />
              <Button variant={'outline'}>Submit</Button>
            </HStack>
          </form>
        </GridItem>
        <GridItem title="Passing send and snapshot as props">
          <form action={() => sendWithValue({ type: 'submit' })}>
            <HStack gap={2}>
              <InputTextSharedMachine send={sendWithValue} snapshot={snapshotWithValue} />
              <Button variant={'outline'}>Submit</Button>
            </HStack>
          </form>
        </GridItem>
        <GridItem title="Child sending events to parent reference">
          <form action={() => sendSendTo({ type: 'submit' })}>
            <HStack gap={2}>
              <InputTextSendTo actor={snapshotSendTo.context.textActor} />


            <Button variant={'outline'}>Submit</Button>
            </HStack>
          </form>
        </GridItem>
        <GridItem title="Parent with reference to child inside context">
          <form action={(formData) => sendWithRef({ type: 'submit', formData })}>
            <HStack gap={2}>
              <InputTextWithActor name="text" actor={snapshotWithRef.context.textActor} />
              <Button variant={'outline'}>Submit</Button>
            </HStack>
          </form>
        </GridItem>
        <GridItem title="Parent invokes child">

            <form action={(formData) => sendInvoke({ type: 'submit', formData })}>
              <HStack gap={2}>
              {snapshotInvoke.children.textActorId && (
                <InputTextInvoke name="text" actor={snapshotInvoke.children.textActorId} />
              )}

              <Button variant={'outline'}>Submit</Button>
              </HStack>
            </form>


        </GridItem>
      <GridItem title="Send to parent, forward to child">
        <form action={() => sendParent({ type: 'submit' })}>

          <HStack gap={2}>

            {snapshotParent.children.textActorId && (
              <InputTextSendParent actor={snapshotParent.children.textActorId} />
            )}
            <Button variant={'outline'}>Submit</Button>

          </HStack>
        </form>

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

        <GridItem title="Button Stories">test</GridItem>
      </SimpleGrid>
    </Container>
  );
};
