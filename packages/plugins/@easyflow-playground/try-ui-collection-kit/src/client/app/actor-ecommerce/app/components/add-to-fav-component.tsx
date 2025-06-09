import React from 'react';
import { useEffect } from "react";
import { useSelector } from "@xstate/react";
import { SimpleGrid, Box, Button, Stack, HStack, Text } from '@chakra-ui/react';

const AddToFavBtn = ({ product }) => {
  const { addToFavBtnRef } = product;
  const state = useSelector(addToFavBtnRef, (state: any) => state.value);

  useEffect(() => {
    addToFavBtnRef.send({ type: "SYNC", productId: product.id });
  }, [addToFavBtnRef, product.id]);

  const handleClick = (e) => {
    e.preventDefault();
    addToFavBtnRef.send({ type: "ADD_OR_REMOVE_FAVORITE", product });
  };

  return (
    <Box>
      <Button size={'xs'} variant={'outline'} onClick={handleClick}>
        {
          state === 'active' ? 'unflag' : 'flag'
        }
      </Button>
    </Box>
  );
};

export default AddToFavBtn;
