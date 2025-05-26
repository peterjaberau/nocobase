import React, { useState } from 'react';
import {
  Heading,
  Button,
  ButtonGroup,
  SimpleGrid,
  Stack,
  Box,
  Container,
  Flex,
  Center,
  HStack,
  CheckboxCard,
} from '@chakra-ui/react';
import { EventCatalog } from './_components/event.catalog.component';
import { EventCatalogVisualiser } from './_components/event.visualizer.component';
import NodeGraphNew from './_components/NodeGraph/NodeGraph';
import { data as dataVisualiser } from './_data/visualiser/payment';
import { TinyButton } from './ui/tiny.button';
import { TinyAccordion } from './ui/tiny.accordion';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack border={'1px solid'} borderColor={'border.muted'} shadow="xs" p="3" borderRadius={'md'}>
      <Heading>{title}</Heading>
      <Box>{children}</Box>
    </Stack>
  );
};

export const Page = () => {
  const [view, setView] = useState('visualiser'); // catalog, visualiser
  const [graph, setGraph]: any = useState(dataVisualiser);

  return (
    <>
      <Container backgroundColor={'bg.panel'} fluid centerContent p={8}>
        <ButtonGroup size="sm" variant="outline">
          <TinyButton onClick={() => setView('catalog')} variant={view === 'catalog' ? 'solid' : 'outline'}>
            Catalog
          </TinyButton>

          <TinyButton onClick={() => setView('visualiser')} variant={view === 'visualiser' ? 'solid' : 'outline'}>
            Visualiser
          </TinyButton>
        </ButtonGroup>

        <TinyAccordion
          items={[
            { title: 'React', value: 'react', content: <TinyButton>React</TinyButton> },
            { title: 'Solid', value: 'solid', content: <TinyButton>Solid</TinyButton> },
            { title: 'Vue', value: 'vue', content: <TinyButton>Vue</TinyButton> }
          ]}
          defaultExpandedValues={['react']}
        />
      </Container>

      {view === 'catalog' && <EventCatalog />}
      {view === 'visualiser' && (
        <NodeGraphNew
          id={graph.id}
          nodes={graph.nodes}
          edges={graph.edges}
          title={graph.title}
          hrefLabel={graph.hrefLabel}
          // href={href.url}
          linkTo={graph.linkTo}
          linksToVisualiser={graph.linksToVisualiser}
          links={graph.links}
        />
      )}
    </>
  );
};

/*

 <EventCatalogVisualiser
          id={'E-Commerce-1.0.0'}
          collection={'domains'}
          version={'1.0.0'}
          mode={'simple'} // full, simple
          href={'#'}
        />
 */
