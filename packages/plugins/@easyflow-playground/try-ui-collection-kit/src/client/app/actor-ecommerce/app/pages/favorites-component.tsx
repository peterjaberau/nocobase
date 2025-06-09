import React from 'react';
import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import CartItem from '../components/cart-item-component';
import {
  Flex,
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

const Favorites = () => {
  const favActorRef = rootContext.useActorRef().system.get('favorites');
  const { favorites } = useSelector(favActorRef, (state: any) => state.context);

  if (favorites.length === 0) {
    return (
      <Flex justify={'center'}>
        <Text textAlign="center">Favorites is empty</Text>
      </Flex>
    );
  }
  return (
    <Stack>
      {favorites.map((item) => (
        <CartItem key={item.id} item={item} isCart={false} />
      ))}
    </Stack>
  );
};

export default Favorites;
