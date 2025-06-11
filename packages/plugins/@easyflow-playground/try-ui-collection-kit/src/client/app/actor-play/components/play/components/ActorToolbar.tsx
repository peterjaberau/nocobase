import { useSmartNode } from '../hooks/useSmartNode';
import { Button, For, HStack } from '@chakra-ui/react';
import { FaEllipsis as IconMore, FaPlay as IconPlay, FaPlus as IconPlus } from 'react-icons/fa6';
import { BsLayoutSidebarInsetReverse as IconSidebarRight } from 'react-icons/bs';
import React from 'react';
import { ActorToolbarItem } from './ActorToolbarItem';
import { IconButton } from '@chakra-ui/react';

export const ActorToolbar = () => {
  const { smartNode, toolbarPlugins } = useSmartNode();

  return (
    smartNode && (
      <HStack justify="flex-end" gap="1" pt="1" pb="1.5">
        <For each={toolbarPlugins}>
          {(item: any, index: number) => {
            let icon = null;

            switch (item.name) {
              case 'collapsible':
                icon = <IconPlus />;
                break;
              case 'attachToSidebar':
                icon = <IconSidebarRight />;
                break;
              case 'run':
                icon = <IconPlay />;
                break;
              default:
                return null;
            }

            return <ActorToolbarItem key={index}>{icon}</ActorToolbarItem>;
          }}
        </For>
        <ActorToolbarItem>
          <IconMore />
        </ActorToolbarItem>
      </HStack>
    )
  );
};
