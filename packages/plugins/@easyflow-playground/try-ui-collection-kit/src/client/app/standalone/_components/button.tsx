import React from 'react';
import { Button, Center, Stack, HStack } from '@chakra-ui/react';
import { colorPalettes } from './utils';

export const ButtonRenderer = (props: any) => {
  return <Button {...props} />;
};

export const ButtonStories = () => {
  return (
    <Stack gap={8} py={8}>
      <Stack>
        {colorPalettes.map((colorPalette) => (
          <Center key={colorPalette}>
            <HStack  gap="6">
              <Button colorPalette={colorPalette}>Button</Button>
              <Button colorPalette={colorPalette} variant="outline">
                Button
              </Button>
              <Button colorPalette={colorPalette} variant="surface">
                Button
              </Button>
              <Button colorPalette={colorPalette} variant="subtle">
                Button
              </Button>
            </HStack>
          </Center>
        ))}
      </Stack>

      <Center>
        <HStack wrap="wrap" gap="6">
          <Button size="xs" color={'white'}>
            Button (xs)
          </Button>
          <Button size="sm" color={'white'}>
            Button (sm)
          </Button>
          <Button size="md" color={'white'}>
            Button (md)
          </Button>
          <Button size="lg" color={'white'}>
            Button (lg)
          </Button>
          <Button size="xl" color={'white'}>
            Button (xl)
          </Button>
        </HStack>
      </Center>
    </Stack>
  );
};
