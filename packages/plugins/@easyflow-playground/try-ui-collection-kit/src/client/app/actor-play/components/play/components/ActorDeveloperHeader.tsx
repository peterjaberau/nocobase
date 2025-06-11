import { HStack } from '@chakra-ui/react';
import React from 'react';

export const ActorDeveloperHeader = ({ title, toolbar }: any) => {
  return (
    <HStack justify="space-between" w="full" px="2">
      <HStack justify="flex-start" p="0" gap="3">
        {title || ''}
      </HStack>
      <HStack justify="flex-end" gap="1" pt="1" pb="1.5">
        {toolbar || ''}
      </HStack>
    </HStack>
  );
};
