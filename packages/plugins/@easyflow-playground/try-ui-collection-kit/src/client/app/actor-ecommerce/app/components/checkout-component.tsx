import React from 'react';
import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import {
  SimpleGrid,
  Box,
  Button,
  Stack,
  HStack,
  Text,
  Badge,
  Card,
  Portal,
  Dialog,
  CloseButton,
} from '@chakra-ui/react';
// import Modal from "../modal/modal-component";

const Checkout = () => {
  const checkoutActorRef = rootContext.useActorRef().system.get('checkout');
  const { totalPrice, modalState } = useSelector(checkoutActorRef, (state: any) => ({
    modalState: state.value,
    totalPrice: state.context.totalPrice,
  }));

  const toggleModal = () => {
    checkoutActorRef.send({ type: 'TOGGLE' });
  };
  return (
    <>
      <Card.Root>
        <Card.Footer>
          <Stack>
            <Text textStyle={'md'}>Summary</Text>
            <HStack gap={2}>
              <HStack>
                <Badge>Total: ${totalPrice}</Badge>
              </HStack>
              <HStack justify={'flex-end'}>
                <Button size={'xs'} variant="outline" onClick={toggleModal}>
                  Checkout
                </Button>
              </HStack>
            </HStack>
          </Stack>
        </Card.Footer>
      </Card.Root>

      <Dialog.Root open={modalState === 'modalActive'} onOpenChange={toggleModal}>
        <Dialog.Trigger asChild>
          <Button variant="outline">Checkout</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Checkout</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>Coming soon</Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Close</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default Checkout;
