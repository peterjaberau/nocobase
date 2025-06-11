import { IconButton } from '@chakra-ui/react';
import React from 'react';

export const ActorDeveloperToolbarItem = ({ children }) => {
  return (
    <IconButton variant="ghost" size="2xs">
      {children}
    </IconButton>
  );
};
