import React from 'react';
import { defineConfig, defaultConfig, createSystem, ChakraProvider, defaultSystem } from '@chakra-ui/react';



export const Provider = (props: { children: React.ReactNode }) => {
  return <ChakraProvider value={defaultSystem}>
      {props.children}
  </ChakraProvider>;
};
