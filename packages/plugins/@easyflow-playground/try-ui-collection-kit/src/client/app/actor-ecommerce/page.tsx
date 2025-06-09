import React from 'react';
import {
  Heading,
  SimpleGrid,
  Stack,
  Box,
  Container,
  Flex,
  Center,
  HStack,
  CheckboxCard,
} from '@chakra-ui/react';
import Categories from './app/pages/categories-component';
import Products from './app/pages/product-component';
import ProductDetails from './app/pages/product-details-component';
import Favorites from './app/pages/favorites-component';
import Cart from './app/pages/cart-component';
import CurrentParams from './app/pages/current-params-component';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack
      border={'1px solid'}
      borderColor={'border.muted'}
      shadow="xs"
      p="3"
      borderRadius={'md'}
      h={'300px'}
      maxH={'300px'}
      overflow={'auto'}
    >
      <Heading>{title}</Heading>
      <Box>
        {children}
      </Box>
    </Stack>
  );
}


export const Page = () => {
  return (
    <Container p={4} bg={'bg.panel'}>
      <SimpleGrid columns={3} gap={4}>
        <GridItem title="Categories">
          <Categories />
        </GridItem>


        <GridItem title="Current Params">
          <CurrentParams />
        </GridItem>

        <GridItem title="Products">
          <Products />
        </GridItem>

        <GridItem title="Product Details">
          <ProductDetails />
        </GridItem>

        <GridItem title="Favorites">
          <Favorites />
        </GridItem>


        <GridItem title="Cart">
          <Cart />
        </GridItem>





      </SimpleGrid>
    </Container>
  );
};
