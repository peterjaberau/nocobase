import { Text } from '@chakra-ui/react';
import React from 'react';

export const ActorHeaderTitle = ({ children }) => {
  return (
    <Text fontWeight="500" fontSize="sm" m={0}>
      {children}
    </Text>
  );
};
