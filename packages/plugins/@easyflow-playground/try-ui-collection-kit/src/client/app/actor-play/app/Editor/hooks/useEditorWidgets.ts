import { useSelector } from '@xstate/react';
import { editorContext } from '../EditorContext';
import { useEditorWidget } from './useEditorWidget'
import { createListCollection } from '@chakra-ui/react';

export const useEditorWidgets = () => {
  const editorWidgetsRef = editorContext.useActorRef().system.get('editor-widgets');
  const editorWidgets: any = useSelector(editorWidgetsRef, (state) => state);

  const editorWidgetsMetaCollection = createListCollection({
    items: editorWidgets.context.widgets.map((widget) => {
      const { editorWidget, editorWidgetId } = useEditorWidget({widget: widget})
      const { id, displayName, name } = editorWidget.context

      return {
        systemId: editorWidgetId,
        id,
        value: editorWidgetId,
        displayName,
        name
      }

    }),
    itemToString: (item) => item.displayName,
    itemToValue: (item) => item.id,
  })

  // const editorWidgetsMetaItems = editorWidgets.context.widgets.map((widget) => {
  //   const { editorWidget, editorWidgetId } = useEditorWidget({widget: widget})
  //   const { id, displayName, name } = editorWidget.context
  //
  //   return {
  //     systemId: editorWidgetId,
  //     id, displayName, name
  //   }
  //
  // })

  return {
    editorWidgetsRef,
    editorWidgets,
    editorWidgetsMetaCollection,
    // editorItemsRef,
    // editorItemsMeta
    // sendToEditorWidgets,
  };
};
