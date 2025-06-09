import React from 'react';
import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import Checkout from '../components/checkout-component';
import CartItem from '../components/cart-item-component';
import {
  Wrap,
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

const Cart = () => {
  const cartActorRef = rootContext.useActorRef().system.get('cart');
  const cart = useSelector(cartActorRef, (state: any) => state.context.cart);

  if (cart.length === 0) {
    return (
      <div className="text-center font-semibold">
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <Stack>
      {cart.map((item) => (
        <CartItem key={item.id} item={item} isCart={true} />
      ))}
      <Box>
        <Checkout />
      </Box>
    </Stack>
  );
};

export default Cart;
