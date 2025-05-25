import React, { useState } from 'react';
import { Heading, Button, ButtonGroup, SimpleGrid, Stack, Box, Container, Flex, Center, HStack, CheckboxCard } from '@chakra-ui/react';
import { EventCatalog } from './_components/event.catalog.component';
import { EventCatalogVisualiser } from './_components/event.visualizer.component';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack border={'1px solid'} borderColor={'border.muted'} shadow="xs" p="3" borderRadius={'md'}>
      <Heading>{title}</Heading>
      <Box>{children}</Box>
    </Stack>
  );
};

export const Page = () => {
  const [view, setView] = useState('catalog') // catalog, visualiser
  return (
    <>
      <Container backgroundColor={'bg.panel'} fluid centerContent p={8}>
        <ButtonGroup size="sm" variant="outline">
          <Button
            onClick={() => setView('catalog')}
            variant={view === 'catalog' ? 'solid' : 'outline'}
            color={view === 'catalog' ? 'fg.inverted' : undefined}
          >
            Catalog
          </Button>

          <Button
            onClick={() => setView('visualiser')}
            variant={view === 'visualiser' ? 'solid' : 'outline'}
            color={view === 'visualiser' ? 'fg.inverted' : undefined}
          >
            Visualiser
          </Button>

        </ButtonGroup>
      </Container>

      {view === 'catalog' && <EventCatalog />}
      {view === 'visualiser' &&
        <EventCatalogVisualiser
          id={'E-Commerce-1.0.0'}
          collection={'domains'}
          version={'1.0.0'}
          mode={'simple'} // full, simple
          href={'#'}
        />
      }

    </>
  );
};
