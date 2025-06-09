import React from 'react';
import { useSelector } from "@xstate/react";
import { SimpleGrid, Box, Button, Stack, HStack, Text, Badge } from '@chakra-ui/react';
import { rootContext } from "../RootContext";

const FavIcon = () => {
  const favIconActorRef = rootContext.useActorRef().system.get("favIcon");
  const { favCount, state } = useSelector(favIconActorRef, (state: any) => ({
    favCount: state.context.favorites.length,
    state: state.value,
  }));

  return (
    <SimpleGrid columns={3} gap={2}>
      <Badge>
        {favCount}
      </Badge>
      {state}
    </SimpleGrid>
  );
};

export default FavIcon;
