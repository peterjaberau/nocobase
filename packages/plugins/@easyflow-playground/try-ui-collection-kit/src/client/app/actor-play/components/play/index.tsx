import React, { useState } from 'react';
import {
  FaRegCopy as IconCopy,
  FaStop as IconStop,
  FaRegCirclePause as IconPause,
  FaBug as IconDebug,
  FaCircleCheck as IconSuccess,
  FaBolt as IconBolt,
  FaPlus as IconPlus,
  FaPlay as IconPlay,
  FaEllipsis as IconMore,
  FaCode as IconCode,
  FaWindowMinimize as IconMinus,
} from 'react-icons/fa6';
import {
  BsLayoutSidebarInsetReverse as IconSidebarRight,
  BsLayoutSidebarInset as IconSidebarLeft,
} from 'react-icons/bs';
import { FaRegCommentAlt as IconComment } from 'react-icons/fa';
import { TiWarning as IconWarning } from 'react-icons/ti';
import { BiSolidErrorCircle as IconError } from 'react-icons/bi';
import { LuInfo as IconInfo } from 'react-icons/lu';
import { PiBracketsCurlyBold as IconCurly } from 'react-icons/pi';
import { HiOutlineDatabase as IconDatabase } from 'react-icons/hi';
import { GrShareOption as IconWorkflow } from 'react-icons/gr';
import { TbSwitchHorizontal as IconSwitch } from 'react-icons/tb';
import { RiDvdAiLine as IconAiAction, RiChatSmileAiLine as IconAiChat } from 'react-icons/ri';
import { LuTimerReset as IconTimer } from 'react-icons/lu';
import { TiArrowLoop as IconRetry } from 'react-icons/ti';
import { BiCollapseVertical as IconCollapse, BiExpandVertical as IconExpand } from 'react-icons/bi';
import { LuWrapText as IconWrap } from 'react-icons/lu';
import { RxReset as IconReset } from 'react-icons/rx';
import { IoClose as IconClose, IoChevronUp as IconChevronUp, IoChevronDown as IconChevronDown } from 'react-icons/io5';
import { AiOutlineDelete as IconDelete } from 'react-icons/ai';
import { MdOutlineSave as IconSave } from 'react-icons/md';

import { usePlay } from './usePlay';
import {
  Portal,
  Container,
  Stack,
  VStack,
  HStack,
  Flex,
  Wrap,
  SimpleGrid,
  Group,
  Grid,
  Float,
  Center,
  Circle,
  Square,
  Box,
  Bleed,
  Separator,
  Icon,
  EmptyState,
  Collapsible,
  Tabs,
  Card,
  Accordion,
  Steps,
  Tag,
  Stat,
  Status,
  Progress,
  Avatar,
  Badge,
  Alert,
  ProgressCircle,
  Spinner,
  RadioCard,
  RadioGroup,
  SegmentGroup,
  CheckboxCard,
  Checkbox,
  Switch,
  NumberInput,
  Select,
  Input,
  ColorPicker,
  Popover,
  Menu,
  HoverCard,
  DataList,
  Breadcrumb,
  Table,
  Timeline,
  Button,
  IconButton,
  CloseButton,
  Clipboard,
  ActionBar,
  Show,
  For,
  Presence,
  FormatByte,
  FormatNumber,
  ClientOnly,
  Text,
  Prose,
  Mark,
  List,
  Link,
  LinkOverlay,
  Highlight,
  Heading,
  Em,
  Code,
} from '@chakra-ui/react';

export const ActorHeaderTitle = ({ children }) => {
  return (
    <Text fontWeight="500" fontSize="sm" m={0}>
      {children}
    </Text>
  );
};

export const ActorToolbarItem = ({ children }) => {
  return (
    <IconButton variant="ghost" size="2xs">
      {children}
    </IconButton>
  );
};

export const ActorToolbar = () => {
  return (
    <HStack justify="flex-end" gap="1" pt="1" pb="1.5">
      <ActorToolbarItem>
        <IconPlus />
      </ActorToolbarItem>
      <ActorToolbarItem>
        <IconSidebarRight />
      </ActorToolbarItem>
      <ActorToolbarItem>
        <IconPlay />
      </ActorToolbarItem>
      <ActorToolbarItem>
        <IconMore />
      </ActorToolbarItem>
    </HStack>
  );
};

export const ActorHeader = ({ title, toolbar }) => {
  return (
    <HStack justify="space-between" w="full" px="2">
      <HStack justify="flex-start" p="0" gap="3">
        <IconBolt />
        <ActorHeaderTitle>{title}</ActorHeaderTitle>
      </HStack>

      <HStack justify="flex-end" gap="1" pt="1" pb="1.5">
        {toolbar || ''}
      </HStack>

    </HStack>
  );
};

export const ActorFooterTab = ({ children, isSelected = false, isDisabled = false }) => {
  return (
    <Bleed
      pt="2px"
      borderBottom="2px"
      borderBottomColor={isSelected ? 'border.inverted' : 'transparent'}
      borderBottomStyle="solid"
    >
      <Button
        variant="plain"
        size="xs"
        textAlign="left"
        fontSize="xs"
        color={isDisabled ? 'fg.subtle' : isSelected ? 'fg' : 'fg.muted'}
        fontWeight="600"
        py="2.5"
        px="0"
        _hover={{
          backgroundColor: 'transparent',
          color: 'fg',
        }}
      >
        {children}
      </Button>
    </Bleed>
  );
};

export const ActorFooter = () => {
  return (
    <Bleed backgroundColor="bg.muted">
      <HStack justify="space-between" w="full" px="2">
        <HStack justify="flex-start" p="0" gap="3">
          <ActorFooterTab isSelected={true}>Inputs</ActorFooterTab>
          <ActorFooterTab>Data</ActorFooterTab>
          <ActorFooterTab>JSON</ActorFooterTab>
          <ActorFooterTab isDisabled={true}>Settings</ActorFooterTab>
        </HStack>
        <HStack justify="flex-end">
          <Badge variant="plain">Status</Badge>
        </HStack>
      </HStack>
    </Bleed>
  );
};

export const ActorContentEmpty = () => {
  return (
    <EmptyState.Root px={4} py={3}>
      <EmptyState.Content gap={0}>
        <EmptyState.Title m={0} fontSize={'md'}>Actors not found</EmptyState.Title>
        <EmptyState.Description m={0}>
          Please check your configuration or try again later.
        </EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>

  );
};

export const ActorContent = ({ children, hasActors = false }) => {
  return (
    <Card.Root border='none'><Card.Body p={2}>
      <Show when={hasActors} fallback={<ActorContentEmpty />}>
        {children}
      </Show>
    </Card.Body></Card.Root>
  );
};



export const ActorDeveloperToolbarItem = ({ children }) => {
  return (
    <IconButton variant="ghost" size="2xs">
      {children}
    </IconButton>
  );
};

export const ActorDeveloperToolbar = () => {
  return (
    <HStack justify="flex-end" gap="1" pt="1" pb="1.5">
      <ActorDeveloperToolbarItem>
        <IconExpand />
      </ActorDeveloperToolbarItem>
      <ActorDeveloperToolbarItem>
        <IconCollapse />
      </ActorDeveloperToolbarItem>
      <ActorDeveloperToolbarItem>
        <IconRetry />
      </ActorDeveloperToolbarItem>
      <ActorDeveloperToolbarItem>
        <IconCopy />
      </ActorDeveloperToolbarItem>
      <ActorDeveloperToolbarItem>
        <IconClose />
      </ActorDeveloperToolbarItem>
    </HStack>
  );
};

export const ActorDeveloperHeader = ({ title, toolbar }: any) => {
  return (
    <HStack justify="space-between" w="full" px="2">
      <HStack justify="flex-start" p="0" gap="3">
        {title || ''}
      </HStack>
      <HStack justify="flex-end" gap="1" pt="1" pb="1.5">
        {toolbar || ''}
      </HStack>
    </HStack>
  );
};

export const ActorDeveloperContentEmpty = () => {
  return (
    <EmptyState.Root px={4} py={3}>
      <EmptyState.Content gap={0}>
        <EmptyState.Title m={0} fontSize={'md'}>Developer instance not found</EmptyState.Title>
        <EmptyState.Description m={0}>
          Please check your configuration or try again later.
        </EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>

  );
};

export const ActorDeveloperContent = ({ children, hasActors = false }) => {
  return (
    <Show when={hasActors} fallback={<ActorDeveloperContentEmpty />}>
      {children}
    </Show>
  );
};

export const ActorDeveloper = ({ children, hasActors = false }) => {
  return (
    <Card.Root>
      <Card.Header p="0">
        <ActorDeveloperHeader title="" toolbar={<ActorDeveloperToolbar />} />
      </Card.Header>
      <Card.Body p={2}>
        <ActorDeveloperContent hasActors={hasActors}>{children}</ActorDeveloperContent>
      </Card.Body>
    </Card.Root>
  );
};

export const Play = ({ hasActors = false}: any) => {
  return (
    <Stack w="400px">
      <Stack backgroundColor="bg.panel" shadow="sm" borderRadius="sm" >
        <Collapsible.Root w="full" defaultOpen={true}>
          <Collapsible.Trigger w="full">
            <ActorHeader title='Actor title' toolbar={<ActorToolbar />} />
          </Collapsible.Trigger>
          <Collapsible.Content >
            <ActorContent hasActors={hasActors}>actor content</ActorContent>
          </Collapsible.Content>
        </Collapsible.Root>
        <ActorFooter />
      </Stack>
      <ActorDeveloper hasActors={hasActors}>developer panel</ActorDeveloper>
    </Stack>
  );
};
