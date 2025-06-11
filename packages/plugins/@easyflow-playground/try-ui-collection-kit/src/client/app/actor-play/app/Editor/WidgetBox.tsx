import React from 'react';
import WidgetIcon from '../assets/images/icons/widgets';
import { useTranslation } from '../../../../locale';
import { Box, Center, Button, HStack, Badge, Icon, Text, Stack, VStack, IconButton } from '@chakra-ui/react';
import { useEditorWidget } from './hooks/useEditorWidget';

const LEGACY_WIDGETS = ['ToggleSwitch', 'DropDown', 'Multiselect'];
const NEW_WIDGETS = ['ToggleSwitchV2', 'DropdownV2', 'MultiselectV2'];

const WidgetBox = ({ item }) => {
  const { t } = useTranslation();
  const { editorWidget, isNewWidget, isLegacyWidget, hasNewOrLegacyFlag } = useEditorWidget({ widget: item });

  return (
    <Button variant="outline" w={'full'} size="sm">
      <WidgetIcon name={editorWidget.context.name.toLowerCase()} />
      {t(`widget.${editorWidget.context.name}.displayName`, editorWidget.context.displayName)}
      {hasNewOrLegacyFlag && (
        <Badge>
          {isLegacyWidget && 'Lgcy'}
          {isNewWidget && 'New'}
        </Badge>
      )}
    </Button>
  );
};

export default WidgetBox;
