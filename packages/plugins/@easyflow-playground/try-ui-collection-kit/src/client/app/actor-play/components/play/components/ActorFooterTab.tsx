import { Bleed, Button } from '@chakra-ui/react';
import React from 'react';

export const ActorFooterTab = ({ children, isSelected = false, isDisabled = false }) => {

  return (
    <Bleed
      pt="2px"
      borderBottom="2px"
      borderBottomColor={isSelected ? 'border.inverted' : 'transparent'}
      borderBottomStyle="solid"
    >
      <Button
        variant="plain"
        size="xs"
        textAlign="left"
        fontSize="xs"
        color={isDisabled ? 'fg.subtle' : isSelected ? 'fg' : 'fg.muted'}
        fontWeight="600"
        py="2.5"
        px="0"
        _hover={{
          backgroundColor: 'transparent',
          color: 'fg',
        }}
      >
        {children}
      </Button>
    </Bleed>
  );
};
