import React from 'react';
import {
  Heading,
  SimpleGrid,
  Stack,
  Box,
  Container,
  Flex,
  Center,
  HStack,
  CheckboxCard,
} from '@chakra-ui/react';

import { CardUi } from '../../components/Card';
import { CardList } from '../../components/CardList';

const GridItem = ({ title, children }: any) => {
  return (
    <Stack
      border={'1px solid'}
      borderColor={'border.muted'}
      shadow="xs"
      p="3"
      borderRadius={'md'}
    >
      <Heading>{title}</Heading>
      <Box>
        {children}
      </Box>
    </Stack>
  );
}


export const Page = () => {
  return (
    <Container p={4} bg={'bg.panel'}>
      <SimpleGrid columns={2} gap={4}>
        <GridItem title="CardUi">
         <SimpleGrid columns={3} gap={3}>
           <CardUi type='default' title={'default'} badge={{ children: 'badge', variant: 'solid' }} />
           <CardUi type='default' title={'default'} text={'description'} />
           <CardUi type='default' title={'default'} />
         </SimpleGrid>
        </GridItem>


        <GridItem title="Card List">
          <CardList defaultItemsPerRow={2} items={[
            {
              type: 'default',
              title: 'default',
              badge: { children: 'badge', variant: 'solid' },
            },
            {
              type: 'default',
              title: 'default',
              text: 'description',
            },
            {
              type: 'default',
              title: 'default',
            },
          ]} />
        </GridItem>



      </SimpleGrid>
    </Container>
  );
};
