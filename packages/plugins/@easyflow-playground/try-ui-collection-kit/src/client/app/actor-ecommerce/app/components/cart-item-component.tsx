
import React from 'react';
import AddToFavBtn from './add-to-fav-component';
import AddToCartBtn from './add-to-cart-btn-component';
import DeleteFromCartBtn from './delete-from-cart-component';
import {
  Image,
  SimpleGrid,
  Box,
  Button,
  VStack,
  Stack,
  HStack,
  Text,
  Badge,
  Card,
  Portal,
  Dialog,
  CloseButton,
} from '@chakra-ui/react';
const CartItem = ({ item, isCart }) => {
  return (
    <Stack p={1}>
      <Text textStyle={'sm'}>{item.title}</Text>
      <HStack justify={'flex-start'} gap={2}>
        <Badge>Price: {item.price}</Badge>
        <AddToFavBtn product={item} />
        {isCart && <DeleteFromCartBtn product={item} />}
        <AddToCartBtn product={item} />
      </HStack>
    </Stack>
  );
};

export default CartItem;
