import React from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine, InspectionEvent, spawnChild, setup } from 'xstate';
import { editorWidgetsMachine } from './machines';
import { componentTypes } from './WidgetManager/components';

const editorMachine = createMachine({
  entry: [
    spawnChild(editorWidgetsMachine, { systemId: 'editor-widgets', input: { widgets: componentTypes } }),
  ],
});

export const editorContext: any = createActorContext(editorMachine);

const EditorContext = ({ children }) => {
  return <editorContext.Provider>{children}</editorContext.Provider>;
};

export default EditorContext;
