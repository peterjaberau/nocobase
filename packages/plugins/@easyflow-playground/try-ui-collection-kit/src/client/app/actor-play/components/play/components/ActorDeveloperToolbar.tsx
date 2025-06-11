import { HStack } from '@chakra-ui/react';
import { BiCollapseVertical as IconCollapse, BiExpandVertical as IconExpand } from 'react-icons/bi';
import { TiArrowLoop as IconRetry } from 'react-icons/ti';
import { FaRegCopy as IconCopy } from 'react-icons/fa6';
import { IoClose as IconClose } from 'react-icons/io5';
import React from 'react';
import { ActorDeveloperToolbarItem } from './ActorDeveloperToolbarItem';

export const ActorDeveloperToolbar = () => {

  return (
    <HStack justify="flex-end" gap="1" pt="1" pb="1.5">
      <ActorDeveloperToolbarItem>
        <IconExpand />
      </ActorDeveloperToolbarItem>
      <ActorDeveloperToolbarItem>
        <IconCollapse />
      </ActorDeveloperToolbarItem>
      <ActorDeveloperToolbarItem>
        <IconRetry />
      </ActorDeveloperToolbarItem>
      <ActorDeveloperToolbarItem>
        <IconCopy />
      </ActorDeveloperToolbarItem>
      <ActorDeveloperToolbarItem>
        <IconClose />
      </ActorDeveloperToolbarItem>
    </HStack>
  );
};
