import React from 'react';
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { SimpleGrid, Box, Button, Stack, HStack, Text } from '@chakra-ui/react';

const DeleteFromCartBtn = ({ product }) => {
  const {
    deleteBtnMachineRef: { send },
  } = product;
  const handleDeleteClick = (e) => {
    e.preventDefault();
    send({ type: "DELETE_ITEM", productId: product.id });
  };

  return (
    <Button variant='outline' onClick={handleDeleteClick}>
      Delete from Cart
    </Button>
  );
};

export default DeleteFromCartBtn;
