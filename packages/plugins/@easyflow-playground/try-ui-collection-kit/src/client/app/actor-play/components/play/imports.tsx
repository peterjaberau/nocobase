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
  Mark,
  List,
  Link,
  LinkOverlay,
  Highlight,
  Heading,
  Em,
  Code,
} from '@chakra-ui/react';
