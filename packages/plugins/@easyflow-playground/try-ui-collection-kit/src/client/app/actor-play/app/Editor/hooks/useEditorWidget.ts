import { useSelector } from '@xstate/react';

const LEGACY_WIDGETS = ['ToggleSwitch', 'DropDown', 'Multiselect'];
const NEW_WIDGETS = ['ToggleSwitchV2', 'DropdownV2', 'MultiselectV2'];

export const useEditorWidget = ({ widget, widgetId }: any) => {
  const editorWidgetRef = widget;
  const editorWidget: any = useSelector(editorWidgetRef, (state) => state);
  const sendToEditorWidget = editorWidgetRef.send;

  const editorWidgetId = editorWidgetRef.id;
  const isLegacyWidget = LEGACY_WIDGETS.includes(editorWidget.context.component);
  const isNewWidget = NEW_WIDGETS.includes(editorWidget.context.component);
  const hasNewOrLegacyFlag = isLegacyWidget || isNewWidget;

  return {
    editorWidgetRef,
    editorWidget,
    sendToEditorWidget,
    editorWidgetId,
    isLegacyWidget,
    isNewWidget,
    hasNewOrLegacyFlag
  };
};
