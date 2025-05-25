import React from 'react';
import { defineConfig, defaultConfig, createSystem, ChakraProvider, defaultSystem } from '@chakra-ui/react';

const config = defineConfig({
  cssVarsPrefix: "ck",
  theme: {
    // tokens: {
    //   colors: {},
    // },
  },
})

const system = createSystem(defaultConfig, config)


export const Provider = (props: { children: React.ReactNode }) => {
  return <ChakraProvider value={system}>
      {props.children}
  </ChakraProvider>;
};
