import React from 'react';
import { Container, Center, Button, HStack } from '@chakra-ui/react';

export const Page = () => {
  return (
    <Container p={4} bg={'bg.panel'}>
      <Button colorPalette={'blue'} variant={'outline'}>Chakra Button</Button>
    </Container>
  );
};
