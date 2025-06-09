import React from 'react';
import { useSelector } from '@xstate/react';
import { rootContext } from '../RootContext';
import JsonView from 'react18-json-view';
import {
  SimpleGrid,
  Wrap,
  Image,
  Box,
  VStack,
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

const CurrentParams = () => {
  const machineParamsRef = rootContext.useActorRef().system.get('currentParams');
  const data = useSelector(machineParamsRef, ({ context }) => context);


  return (
    <Box>
      <JsonView src={data} />
    </Box>
  );
};

export default CurrentParams;
