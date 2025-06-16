import { createActorContext } from '@xstate/react';
import { createMachine, InspectionEvent, spawnChild, setup } from 'xstate';


const editorMachine = setup({

}).createMachine({
  context: (({ input }) => {
    return {
      ...input
    }
  })

});
