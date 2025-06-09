import React from 'react';
import { useEffect } from 'react';
import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import AddToCartBtn from '../components/add-to-cart-btn-component';
import AddToFavBtn from '../components/add-to-fav-component';
import {
  SimpleGrid,
  Image,
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

const ProductDetails = () => {
  const machineParamsRef = rootContext.useActorRef().system.get('currentParams');
  const dataParams = useSelector(machineParamsRef, ({ context }) => context);

  const machineRef = rootContext.useActorRef().system.get('productDetails');

  useEffect(() => {
    machineRef.send({ type: 'SET_PRODUCT_ID', id: dataParams.product?.id });
  }, [machineRef, dataParams.product?.id]);

  const { product, state } = useSelector(machineRef, ({ context, value }) => ({
    product: context.product,
    state: value,
  }));

  if (state === 'fetchingProduct' || !product) {
    return <Box>..Loading</Box>;
  }
  return (
  <Card.Root>
    <HStack justify={'center'} gap={2} p={2}>
      <Badge>Price: {product.price}</Badge>
      <AddToFavBtn product={product} />
      <AddToCartBtn product={product} />
    </HStack>
    <Card.Header>
          <Card.Title>{product.title}</Card.Title>
          <Card.Description>{product.description}</Card.Description>
      </Card.Header>
    <Card.Footer>
      <Image src={product.image} alt={product.title} w={'full'} />

    </Card.Footer>

    </Card.Root>
  );
};

export default ProductDetails;
