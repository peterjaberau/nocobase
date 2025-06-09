import React from 'react';
import { Box, HStack, Button, Stack, SimpleGrid, Text  } from '@chakra-ui/react';
import { useSelector } from '@xstate/react';
import { rootContext } from '../../RootContext';

export const Toolbar = () => {
  const settingsActorRef = rootContext.useActorRef().system.get('settings-machine');
  const settingsControlActorRef = rootContext.useActorRef().system.get('settings-control-machine');
  const currentParamsActorRef = rootContext.useActorRef().system.get('current-params-machine');

  const settings = useSelector(settingsActorRef, (state: any) => ({
    settings: state.context,
  }));

  const { sessionMode } = useSelector(currentParamsActorRef, (state: any) => ({
    sessionMode: state.context.sessionMode,
  }));

  const { sessionModeOptions } = useSelector(settingsControlActorRef, (state: any) => ({
    sessionModeOptions: state.context.sessionModeOptions,
  }));

  return <Box>Ai Prompts Panel</Box>;
};
