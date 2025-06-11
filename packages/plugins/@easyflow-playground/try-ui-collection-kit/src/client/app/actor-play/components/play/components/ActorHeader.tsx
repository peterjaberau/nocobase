import { HStack } from '@chakra-ui/react';
import { FaBolt as IconBolt } from 'react-icons/fa6';
import React from 'react';
import { ActorHeaderTitle } from './ActorHeaderTitle';

export const ActorHeader = ({ title, toolbar }) => {
  return (
    <HStack justify="space-between" w="full" px="2">
      <HStack justify="flex-start" p="0" gap="3">
        <IconBolt />
        <ActorHeaderTitle>{title}</ActorHeaderTitle>
      </HStack>

      {
        toolbar && (
          <HStack justify="flex-end" gap="1" pt="1" pb="1.5">
            {toolbar}
          </HStack>
        )
      }
    </HStack>
  );
};
