import React from 'react';
import { useSelector } from '@xstate/react';
import { useEffect } from 'react';
import { SimpleGrid, Box, Button, Stack, HStack, Text } from '@chakra-ui/react';

const AddToCartBtn = ({ product: { btnMachineRef, ...product } }) => {
  const {
    value,
    context: { productCount },
  }: any = useSelector(btnMachineRef, (state) => state);

  useEffect(() => {
    btnMachineRef.send({ type: 'SYNC_COUNT', productId: product.id });
  }, [btnMachineRef, product.id]);

  const addToCart = (e) => {
    e.preventDefault();
    btnMachineRef.send({ type: 'ADD_PRODUCT_COUNT', product });
  };

  const reduceFromCart = (e) => {
    e.preventDefault();
    btnMachineRef.send({ type: 'REDUCE_PRODUCT_COUNT', product });
  };

  if (value === 'active') {
    return (
      <HStack justify="space-between">
        <Button size="sm" variant="outline" onClick={addToCart}>
          +
        </Button>
        <Text textStyle={'lg'}>{productCount}</Text>
        <Button size="sm" variant="outline" onClick={reduceFromCart}>
          -
        </Button>
      </HStack>
    );
  }

  return (
    <Button size="xs" variant="outline" onClick={addToCart}>
      Add To Cart
    </Button>
  );
};

export default AddToCartBtn;
