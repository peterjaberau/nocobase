import { assign, fromPromise, setup } from 'xstate';
import { storiesData } from './data';
import { data } from '../../actor-ecommerce/app/config';
import { addToCartBtnMachine, addToFavMachine } from '../../actor-ecommerce/app/machines';

export const tmpMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  },
  actions: {},
  actors: {},
  guards: {},
}).createMachine({
  initial: 'initial',
  context: ({ input }) => ({
    name: null,
    ...input,
  }),
});

export const storiesMachine = setup({}).createMachine({
  context: storiesData,
});


export const simulatorMachine = setup({
  types: {
    context: {} as any,
    events: {} as any,
  },
  actions: {
    setStory: assign({
      storyRef: ({ spawn, event }) =>
        spawn(storiesMachine, ...event),
    }),
    setStart: assign({
      controls: ({ event }) => ({
        start: true,
        stop: false,
      }),
    }),
    setStop: assign({
      controls: ({ event }) => ({
        stop: false,
        start: true,
      }),
    }),
  },
}).createMachine({
  initial: 'initial',
  context: ({ input }) => ({
    storyRef: null,
    controls: {
      start: false,
      stop: false,
    },
    ...input,
  }),
  states: {
    initial: {
      on: {
        STORY_CHANGE: {
          actions: 'setStory',
        },
        START: {
          target: 'running',
          actions: ['setStart'],
        },
      },
    },

    running: {
      on: {
        STOP: {
          target: 'initial',
          actions: ['setStop'],
        },
      },
    },
  },
});

export const paramsMachine = setup({
  actions: {
    setStory: assign({
      story: ({ event }) => event.story,
    }),
  },
}).createMachine({
  context: {
    story: null,
  },
  initial: 'initial',
  states: {
    initial: {
      on: {
        STORY_CHANGE: {
          actions: 'setStory',
        },
      },
    },
  },
});
