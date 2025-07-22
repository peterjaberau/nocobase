import { assign, setup, createMachine, spawnChild } from 'xstate';
import defaultStates from './playground.defaults';


export const rootMachine = createMachine({
  context: ({ input }) => ({
    ...defaultStates.playgroundLayout,
    input,
  })
})
