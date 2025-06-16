import React, { useState, useEffect } from 'react';
import { componentTypes } from './WidgetManager/components';
import { For, Stack, Box, VStack, Select, Portal } from '@chakra-ui/react';
import WidgetBox from './WidgetBox';
import { useEditorWidgets } from './hooks/useEditorWidgets';
import { useEditorWidget } from './hooks/useEditorWidget';

export const EditorWidgetSearchItem = ({ item }: any) => {
  // const { editorWidget, isNewWidget, isLegacyWidget, hasNewOrLegacyFlag } = useEditorWidget({ widget: item });

  return (
    <Select.Item item={item}>
      {item.displayName}
      {/*{editorWidget.context.displayName}*/}
      <Select.ItemIndicator />
    </Select.Item>
  );
};

export const EditorWidgetSearchItems = () => {
  const { editorWidgets, editorWidgetsMetaCollection } = useEditorWidgets();

  return (
    <Select.Root
      collection={editorWidgetsMetaCollection}
      size="sm"
      width="320px"
    >
      <Select.HiddenSelect />
      <Select.Label/>

      <Select.Control>
        <Select.Trigger>
          <Select.ValueText/>
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>

            {editorWidgetsMetaCollection.items.map((widget) => (
              <Select.Item item={widget} key={widget.id}>
                {widget.displayName}
                <Select.ItemIndicator />
              </Select.Item>
            ))}


            {/*<For each={editorWidgetsMetaCollection.items}>*/}
            {/*  {(item: any, index: any) => {*/}
            {/*    return <EditorWidgetSearchItem key={index} item={item} />;*/}
            {/*  //   editorWidgets.context.widgets[index]*/}
            {/*  }}*/}
            {/*</For>*/}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export const EditorWidgetsSearch = () => {
  return <EditorWidgetSearchItems />;
};

export const EditorWidgetItems = ({ props }: any) => {
  const { editorWidgets, editorWidgetsMetaCollection } = useEditorWidgets();

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
