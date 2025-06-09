import React from 'react';
import {
  Heading,
  SimpleGrid,
  Stack,
  Box,
  Container,
  Flex,
  Menu,
  Portal,
  Center,
  Button,
  HStack,
  CheckboxCard,
  Toggle,
} from '@chakra-ui/react';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack border={'1px solid'} borderColor={'border.muted'} shadow="xs" p="3" borderRadius={'md'}>
      <Heading>{title}</Heading>
      <Box>{children}</Box>
    </Stack>
  );
};

export const Toolbar = () => {
  return (
    <HStack w={'full'} justify="space-between" px={3} py={1}>
      <HStack flex={1} justify="flex-start">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" size="xs">
              Mode
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="data">data</Menu.Item>
                <Menu.Item value="schema">schema</Menu.Item>
                <Menu.Item value="settings">settings</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </HStack>
      <HStack flex={1} justify="center"></HStack>
      <HStack flex={1} justify="flex-end">
        <Box>right</Box>
      </HStack>
    </HStack>
  );
};

export const Page = () => {
  return (
    <Container backgroundColor={'bg.panel'} fluid p={0} h={'full'}>
      <Stack flex={1} h={'full'} gap={0} backgroundColor={'bg.panel'}>
        <HStack>
          <Toolbar />
        </HStack>
        <HStack w={'full'} h={'full'} backgroundColor={'blue.200'}>
          <HStack h={'full'}>
            <Stack h={'full'} w={12} backgroundColor={'red.400'}>
              L
            </Stack>
            <Stack h={'full'} w={'250px'} backgroundColor={'red.600'}>
              L sidebar
            </Stack>
          </HStack>
          <Stack h={'full'} flex={1} backgroundColor={'red.900'}>
            Main
          </Stack>
          <HStack h={'full'}>
            <Stack h={'full'} w={'250px'} backgroundColor={'red.600'}>
              R sidebar
            </Stack>
            <Stack h={'full'} w={12} backgroundColor={'red.400'}>
              R
            </Stack>
          </HStack>
        </HStack>
        <HStack backgroundColor={'red.200'}>footer</HStack>
      </Stack>
    </Container>
  );
};
