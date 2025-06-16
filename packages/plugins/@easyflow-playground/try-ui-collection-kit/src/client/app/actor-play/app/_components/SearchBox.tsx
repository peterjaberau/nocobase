import React from 'react'

import { Portal, Select, createListCollection, For, Box } from '@chakra-ui/react';
import { useEditorWidget } from '../Editor/hooks/useEditorWidget';
import { useEditorWidgets } from '../Editor/hooks/useEditorWidgets';

export const SearchBoxItem = ({ item }: any) => {
  const { editorWidget, isNewWidget, isLegacyWidget, hasNewOrLegacyFlag } = useEditorWidget({ widget: item });

  return (
    <Select.Item item={item} >
      {editorWidget.context.displayName}
      <Select.ItemIndicator />
    </Select.Item>
  );
};


export const SearchBox = () => {
  const { editorWidgets, editorWidgetsMetaItems } = useEditorWidgets();

  return (
    <Select.Root collection={editorWidgets} size="sm" width="320px">
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select editor widget" />
        </Select.Trigger>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            <For each={editorWidgets.context.widgets}>
              {(item: any, index: any) => {
                return (
                  <SearchBoxItem key={index} item={item} />
                )
              }}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

