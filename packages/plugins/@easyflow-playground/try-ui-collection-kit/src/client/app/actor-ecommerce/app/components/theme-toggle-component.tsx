import React from 'react';
import {
  SimpleGrid,
  Box,
  Button,
  Stack,
  HStack,
  Text,
  Badge,
  Card,
  Portal,
  Dialog,
  CloseButton,
} from '@chakra-ui/react';
import { rootContext } from '../RootContext';

const ThemeToggle = () => {
  const themeToggleActorRef = rootContext.useActorRef().system.get('theme');

  const toggleHandler = () => {
    themeToggleActorRef.send({ type: 'TOGGLE' });
  };

  return (
    <HStack>
      <Button variant={'outline'} onClick={toggleHandler}>
        Light Mode
      </Button>

      <Button variant={'outline'} onClick={toggleHandler}>
        Dark Mode
      </Button>
    </HStack>
  );
};

export default ThemeToggle;
