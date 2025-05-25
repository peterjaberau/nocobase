import React from 'react';
import { usePlaygroundActorSelector } from '../../../machines/context';
import {
  chakra,
  VStack,
  Separator,
  LinkBox,
  LinkOverlay,
  Wrap,
  For,
  Flex,
  Link,
  Heading,
  Stack,
  Button,
  Center,
  Box,
  Card,
  Text,
  SimpleGrid,
  Container,
  HStack,
  Icon,
  ButtonGroup,
  IconButton,
} from '@chakra-ui/react';
import { LuHardDrive } from 'react-icons/lu';
import { GrTrigger } from 'react-icons/gr';
import { IoChatboxOutline } from 'react-icons/io5';
import { VscSymbolEvent } from 'react-icons/vsc';
import { IoSearchOutline } from 'react-icons/io5';
import { LuGlobe } from 'react-icons/lu';
import { Link as RouterLink } from 'react-router-dom';
const isIdleSelector = (snapshot: any) => snapshot.matches('idle');
const isReadySelector = (snapshot: any) => snapshot.matches('ready');

const currentCatalogIdSelector = (snapshot: any) => snapshot.context.eventCatalog.current.catalogId;
const currentCatalogSelector = (snapshot: any) => snapshot.context.eventCatalog.current.catalog;

const domainStateSelector = (snapshot: any, domainId: any) => {
  return snapshot.context.eventCatalog.current.catalog.domains.find((item: any) => item.id === domainId);
};
const getServiceById = (services: any, serviceId: any) => {
  return services.find((item: any) => item.key === serviceId);
};

export const ServiceEvents = ({ events, type }: any) => {
  // collections for icons: 'domains', 'events', 'queries', 'commands', 'services'

  return (
    <ServiceEventsList type={type}>
      <For each={events}>
        {(item: any, index: any) => {
          return <ServiceEventItem key={index} event={item} />;
        }}
      </For>
    </ServiceEventsList>
  );
};
export const ServiceEventsList = ({ children, type }: any) => {
  //type: producer, consumer
  const Semantic: any = type === 'producer' ? 'green' : type === 'consumer' ? 'blue' : 'gray';
  return (
    <Card.Root
      flex={1}
      backgroundColor={`${Semantic}.subtle`}
      borderColor={`${Semantic}.emphasized`}
      borderWidth={'1px'}
      borderStyle={'solid'}
      borderRadius={'xl'}
    >
      <Card.Body overflow={'hidden'} p={'16px'}>
        <Stack>{children}</Stack>
      </Card.Body>
    </Card.Root>
  );
};
export const serviceEventIconsMap = {
  domains: <LuGlobe />,
  events: <VscSymbolEvent />,
  queries: <IoSearchOutline />,
  commands: <IoChatboxOutline />,
  services: <LuHardDrive />,
};
export const ServiceEventItem = ({ event }: any) => {
  // const iconFromMap = serviceEventIconsMap[event.collection];

  return (
    <ButtonGroup
      size="sm"
      maxW="full"
      minW={'150px'}
      borderWidth={'1px'}
      borderColor={'border.border'}
      borderStyle={'solid'}
      backgroundColor={'bg.panel'}
      borderRadius={'md'}
      attached
    >
      <Box borderRight={'1px solid'} borderColor={'border.muted'} px={2}>
        <Icon color={'fg.muted'} size={'sm'} flexShrink={0}>
          {serviceEventIconsMap[event.collection]}
          {/*<GrTrigger />*/}
        </Icon>
      </Box>
      <Button
        variant="plain"
        size={'xs'}
        flex="1 1 auto"
        maxW="100%"
        whiteSpace="nowrap"
        fontWeight={'normal'}
        textOverflow="ellipsis"
        justifyContent="flex-start"
        textAlign="left"
        _hover={{
          bg: 'bg.muted',
          transitionDuration: '0.2s',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {event.data.name}
      </Button>
    </ButtonGroup>
  );
};
export const ServiceEventsHandler = ({ service }: any) => {
  return (
    <HStack>
      <Center>
        <Separator size="lg"  width={'16px'} />
      </Center>
      <Card.Root borderColor={'border.border'} borderWidth={'2px'}>
        <Card.Body overflow={'hidden'} p={'16px'}>
          <Stack alignItems={'center'}>
            <Center>
              <Icon size="xl" color={'gray.focusRing'}>
                <LuHardDrive />
              </Icon>
            </Center>

            <Flex direction="column" textAlign={'center'}>
              <Text textStyle={'sm'} m={0}>
                {service.name}
              </Text>
              <Text textStyle={'xs'} m={0} color={'fg.muted'}>
                {service.version}
              </Text>
            </Flex>
          </Stack>
        </Card.Body>
      </Card.Root>
      <Center>
        <Separator size="lg"  width={'16px'} />
      </Center>
    </HStack>
  );
};

export const DomainEntities = ({ entities }: any) => {
  return (
    <DomainEntitiesList>
      <For each={entities}>
        {(item: any, index: any) => {
          return <DomainEntityItem key={index} entity={item} />;
        }}
      </For>
    </DomainEntitiesList>
  );
};
export const DomainEntitiesList = ({ children }: any) => {
  return <Wrap>{children}</Wrap>;
};
export const DomainEntityItem = ({ entity }: any) => {
  return (
    <Button variant={'solid'} color={'fg.inverted'}>
      {entity.name}
    </Button>
  );
};

export const DomainServices = ({ services }: any) => {
  return (
    <DomainServicesList>
      <For each={services}>
        {(item: any, index: any) => {
          return <DomainServiceItem key={index} service={item} />;
        }}
      </For>
    </DomainServicesList>
  );
};
export const DomainServicesList = ({ children }: any) => {
  return (
    <SimpleGrid columns={2} gap={4}>
      {children}
    </SimpleGrid>
  );
};
export const DomainServiceItem = ({ service }: any) => {
  return (
    <LinkBox cursor={'pointer'}>
      <LinkOverlay as={RouterLink} href={'#'}>
        <Card.Root
          height={'full'}
          borderRadius={'xl'}
          borderWidth={'2px'}
          borderStyle={'dashed'}
          borderColor={'gray.focusRing'}
          css={{
            _hover: {
              boxShadow: 'md',
              bg: 'bg.muted',
              transitionDuration: '0.2s',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
          }}
        >
          <Card.Header>
            <Card.Title>
              {service.name} ({service.version})
            </Card.Title>
            {service.summary && <Card.Description>{service.summary}</Card.Description>}
          </Card.Header>
          <Card.Body>
            <HStack justify={'center'} gap={4}>
              <ServiceEvents events={service.receives} type={'consumer'} />
              <ServiceEventsHandler service={service} />
              <ServiceEvents events={service.sends} type={'producer'} />
            </HStack>
          </Card.Body>
        </Card.Root>
      </LinkOverlay>
    </LinkBox>
  );
};

export const Domains = () => {
  const currentCatalog: any = usePlaygroundActorSelector(currentCatalogSelector);

  return (
    <DomainsList>
      <For each={currentCatalog.domains}>
        {(item: any, index: any) => {
          return <DomainItem key={index} domainId={item.id} />;
        }}
      </For>
    </DomainsList>
  );
};
export const DomainsList = ({ children }: any) => {
  return (
    <Stack p={6} borderWidth={'2px'} borderColor={'yellow.solid'} borderRadius={'xl'} backgroundColor={'yellow.subtle'}>
      {children}
    </Stack>
  );
};
export const DomainItem = ({ children, domainId }: any) => {
  const domain = usePlaygroundActorSelector((snapshot) => domainStateSelector(snapshot, domainId));
  return (
    <Card.Root
      borderWidth={'2px'}
      borderColor={'orange.emphasized'}
      borderRadius={'xl'}
      backgroundColor={'orange.subtle'}
    >
      <Card.Header>
        <Heading size={'2xl'} m={0}>
          {domain.name}
        </Heading>
      </Card.Header>
      <Card.Body>
        <Stack gap={4}>
          <DomainEntities entities={domain.entities} />
          <DomainServices services={domain.services} />
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export const EventCatalog = () => {
  const currentCatalog: any = usePlaygroundActorSelector(currentCatalogSelector);
  const isIdle: any = usePlaygroundActorSelector(isIdleSelector);
  const isReady: any = usePlaygroundActorSelector(isReadySelector);

  return (
    isReady && (
      <Container fluid centerContent>
        <Card.Root>
          <Card.Header>
            <Heading>{currentCatalog.name}</Heading>
          </Card.Header>
          <Card.Body>
            <Domains />
          </Card.Body>
        </Card.Root>
      </Container>
    )
  );
};
