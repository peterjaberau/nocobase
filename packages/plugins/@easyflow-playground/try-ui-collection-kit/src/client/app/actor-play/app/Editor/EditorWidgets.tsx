import React, { useState, useEffect } from 'react';
import { componentTypes } from './WidgetManager/components';
import { For, Stack, Box, VStack } from '@chakra-ui/react';
import WidgetBox from './WidgetBox';
import { useEditorWidgets } from './hooks/useEditorWidgets';
import { useEditorWidget } from './hooks/useEditorWidget';

export const EditorWidgetItems = ({ props }: any) => {
  const { editorWidgets } = useEditorWidgets();

  return (
    <Stack gap={2} h={'300px'} overflow={'hidden'} overflowY={'scroll'} scrollbar={'hidden'} {...props}>
      <For each={editorWidgets.context.widgets}>
        {(item: any, index: any) => {
          return <EditorWidgetItem key={index} item={item} props={props} />;
        }}
      </For>
    </Stack>
  );
};

export const EditorWidgetItem = ({ item, props }) => {

  return (
    <Box {...props}>
      <WidgetBox item={item} />
    </Box>
  );
};

export const EditorWidgets = () => {

  return <EditorWidgetItems />;
};
