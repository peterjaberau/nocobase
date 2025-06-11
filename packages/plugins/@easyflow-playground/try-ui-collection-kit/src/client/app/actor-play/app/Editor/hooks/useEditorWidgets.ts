import { useSelector } from '@xstate/react';
import { editorContext } from '../EditorContext';

export const useEditorWidgets = () => {
  const editorWidgetsRef = editorContext.useActorRef().system.get('editor-widgets');
  const editorWidgets: any = useSelector(editorWidgetsRef, (state) => state);
  // const sendToEditorWidgets = editorWidgetsRef.send;

  return {
    editorWidgetsRef,
    editorWidgets,
    // sendToEditorWidgets,
  };
};
