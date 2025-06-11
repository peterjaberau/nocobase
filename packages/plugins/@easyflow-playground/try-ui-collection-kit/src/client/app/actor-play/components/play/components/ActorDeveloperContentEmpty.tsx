import { EmptyState } from '@chakra-ui/react';
import React from 'react';

export const ActorDeveloperContentEmpty = () => {
  return (
    <EmptyState.Root px={4} py={3}>
      <EmptyState.Content gap={0}>
        <EmptyState.Title m={0} fontSize={'md'}>
          Developer instance not found
        </EmptyState.Title>
        <EmptyState.Description m={0}>Please check your configuration or try again later.</EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};
