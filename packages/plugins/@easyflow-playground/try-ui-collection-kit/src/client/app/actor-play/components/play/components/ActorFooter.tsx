import { useSmartNode } from '../hooks/useSmartNode';
import { Badge, Bleed, HStack } from '@chakra-ui/react';
import React from 'react';
import { ActorFooterTab } from './ActorFooterTab';

export const ActorFooter = () => {
  const { smartNode, smartNodeId, footerPlugins } = useSmartNode();

  return (
    <Bleed backgroundColor="bg.muted">
      <HStack justify="space-between" w="full" px="2">
        <HStack justify="flex-start" p="0" gap="3">
          <ActorFooterTab isSelected={true}>Inputs</ActorFooterTab>
          <ActorFooterTab>Data</ActorFooterTab>
          <ActorFooterTab>JSON</ActorFooterTab>
          <ActorFooterTab isDisabled={true}>Settings</ActorFooterTab>
        </HStack>
        <HStack justify="flex-end">
          <Badge variant="plain">{smartNodeId}</Badge>
        </HStack>
      </HStack>
    </Bleed>
  );
};
