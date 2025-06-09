import React, { forwardRef } from 'react';
import { capitalize, truncate } from 'lodash';
import AddToCartBtn from './add-to-cart-btn-component';
import AddToFavBtn from './add-to-fav-component';

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
import { rootContext } from '../RootContext';
import { useSelector } from '@xstate/react';

const ProductCard = ({ product }: any) => {
  const machineParamsRef = rootContext.useActorRef().system.get('currentParams');
  const dataParams = useSelector(machineParamsRef, ({ context }) => context);
  const machineRef = rootContext.useActorRef().system.get('products');

  const { price, title, image, id, category } = product;

  return (
    <Card.Root
      _hover={{
        cursor: 'pointer',
      }}
      maxW="sm"
      onClick={() =>
        machineParamsRef.send({ type: 'PRODUCT_CHANGE', category: { name: category }, product: { id: id } })
      }
    >
      <Stack  p={1} >
        <Text textStyle={'sm'}>{title}</Text>
        <HStack justify={'flex-start'} gap={2}>
          <Badge>Price: {price}</Badge>
          <AddToFavBtn product={product} />
          <AddToCartBtn product={product} />
        </HStack>
      </Stack>
    </Card.Root>
  );
};

export default ProductCard;
