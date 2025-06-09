import { useSelector } from "@xstate/react";
import React from 'react';
import { rootContext } from "../RootContext";
import { HiShoppingCart } from "react-icons/hi2";
import { SimpleGrid, Box, Button, Stack, HStack, Text, Badge } from '@chakra-ui/react';


const CartIcon = () => {
  const machineRef = rootContext.useActorRef().system.get("cartIcon");
  const { cartCount } = useSelector(machineRef, (state: any) => state.context);
  return (
    <SimpleGrid columns={2} gap={2}>
      <Badge>
        {cartCount}
      </Badge>
      <HiShoppingCart />
    </SimpleGrid>
  );
};

export default CartIcon;
