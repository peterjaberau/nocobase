import React from 'react';
import {
  Heading,
  SimpleGrid,
  Stack,
  VStack,
  Box,
  Container,
  Flex,
  Center,
  HStack,
  Card,
  CheckboxCard,
  Button,
  For
} from '@chakra-ui/react';
import JsonView from 'react18-json-view';
import {
  useDataChildren, useSpawnedChildren, useDataSpawnedChildren, useSpawnedChild,
  usePluginsManager, usePlugin, useComponentTree,
} from './_drafting/hooks';

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

const JsonViewRenderer = ({ data }) => {
  return (
    <JsonView
      src={data}
      collapsed={1}
      theme="github"
    />
  );
}

const ItemChildRenderer = ({ item, index, name }) => {
  return (
    <Box>
      <Button size={'xs'} variant={'outline'}>{name}</Button>
    </Box>
  );
}

const ItemChildActorRenderer = ({ item, index }) => {
  const actorItem = useSpawnedChild({ childId: item.id });


  return (
    <Box>
      <Button shadow='md' size={'xs'} variant={'outline'}>{actorItem.actorId}</Button>
    </Box>
  );
}


const ComponentTree = () => {
  const dataChildren = useDataChildren();
  const spawnedChildren = useSpawnedChildren();
  const dataSpawnedChildren = useDataSpawnedChildren();
}

const PluginsList = () => {
  const { pluginsManagerState, pluginsMetaList, sendToPluginsManager } = usePluginsManager();

  return (
    <HStack align="stretch">
      {pluginsMetaList.map(([id, meta]) => {
        const pluginRef = pluginsManagerState.context.pluginRefs.get(id);
        const { pluginActorRef, pluginState, sendToPlugin } = usePlugin(pluginRef);

        return (
          <Card.Root key={id}>
            <Card.Header p='2'>
              <Card.Title m={0}>{meta.name}</Card.Title>
              <Card.Description m={0}>
                v{meta.version} — state: {pluginState.value}
              </Card.Description>
            </Card.Header>
            <Card.Body p='2'>
              <Button
                size='xs'
                variant='outline'
                onClick={() => {
                  // console.log('id', id)
                  sendToPluginsManager({ type: 'TOGGLE_PLUGIN', pluginId: id })
                }

                }
                colorScheme={meta.config.enabled ? 'green' : 'gray'}
              >
                {meta.config.enabled ? 'Disable' : 'Enable'}
              </Button>
            </Card.Body>
            <Card.Footer p='2'>
              <JsonViewRenderer data={{
                ...pluginState.context,
                meta: meta,
              }} />
            </Card.Footer>
          </Card.Root>
        );
      })}
    </HStack>

  );
}


export const Page = () => {
  const dataChildren = useDataChildren();
  const spawnedChildren = useSpawnedChildren();
  const dataSpawnedChildren = useDataSpawnedChildren();



  return (
    <Container p={4} bg={'bg.panel'} fluid>
      <Stack>
        {/*<AppComponent />*/}
        <PluginsList />
        <SimpleGrid columns={3} gap={4}>

          <GridItem title="dataCollection">
            <Stack>
              <HStack>
                <Stack>
                  <For each={dataChildren.collection}>
                    {(item: any, index) => (
                      <ItemChildRenderer key={index} item={item} index={index} name={item.name} />
                    )}
                  </For>
                </Stack>
                <Box>
                  Selected Item = data
                </Box>
              </HStack>
              <Box>
                <JsonViewRenderer data={{
                  snapshot: dataChildren.snapshot,
                  persistedSnapshot: dataChildren.persistedSnapshot,
                  state: dataChildren.state,
                  machine: dataChildren.state.machine,
                  actorRef: dataChildren.actorRef,
                  actorId: dataChildren.actorId,
                  actorKeys: dataChildren.actorKeys,
                  collection: dataChildren.collection
                }} />
              </Box>
            </Stack>
          </GridItem>

          <GridItem title="spawnedChildren">
            <Stack>
              <HStack>
                <Stack>
                  <For each={spawnedChildren.collection}>
                    {(item: any, index) => (
                      <ItemChildActorRenderer key={index} item={item} index={index}  />
                    )}
                  </For>

                  {/*<For each={spawnedChildren.collection}>*/}
                  {/*  {(item: any, index) => (*/}
                  {/*    <ItemChildRenderer key={index} item={item} index={index} name={item.id} />*/}
                  {/*  )}*/}
                  {/*</For>*/}
                </Stack>
                <Box>
                  Selected Item = spawned
                </Box>
              </HStack>
              <Box>
                <JsonViewRenderer data={{
                  snapshot: spawnedChildren.snapshot,
                  persistedSnapshot: spawnedChildren.persistedSnapshot,
                  stateValue: spawnedChildren.stateValue,
                  status: spawnedChildren.status,
                  state: spawnedChildren.state,
                  machine: spawnedChildren.state.machine,
                  actorRef: spawnedChildren.actorRef,
                  actorId: spawnedChildren.actorId,
                  actorKeys: spawnedChildren.actorKeys,
                  collection: spawnedChildren.collection

                }} />
              </Box>
            </Stack>
          </GridItem>

          <GridItem title="dataSpawnedChildren">
            <Stack>
              <HStack>
                <Stack>
                  <For each={dataSpawnedChildren.collection}>
                    {(item: any, index) => (
                      <ItemChildRenderer key={index} item={item} index={index} name={item.name} />
                    )}
                  </For>
                </Stack>
                <Box>
                  Selected Item = Data to spawned
                </Box>
              </HStack>
              <Box>
                <JsonViewRenderer data={{
                  snapshot: dataSpawnedChildren.snapshot,
                  persistedSnapshot: dataSpawnedChildren.persistedSnapshot,
                  state: dataSpawnedChildren.state,
                  machine: dataSpawnedChildren.state.machine,
                  actorRef: dataSpawnedChildren.actorRef,
                  actorId: dataSpawnedChildren.actorId,
                  actorKeys: dataSpawnedChildren.actorKeys,
                  collection: dataSpawnedChildren.collection
                }} />
              </Box>
            </Stack>
          </GridItem>






        </SimpleGrid>
      </Stack>
    </Container>
  );
};
