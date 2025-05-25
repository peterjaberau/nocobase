import { assertEvent, assign, setup } from 'xstate';
import { create } from 'mutative';
import { configDefaults } from './config';

export const playgroundMachine = setup({
  types: {
    events: {} as any,
    context: {} as any,
  } as any,
  actions: {
    setFirstCatalog: assign(({ context }) => {

      const firstCatalog = context.data.eventCatalog.collections.catalog[0];

      return create(context, (draft) => {
        draft.eventCatalog.current = {
          catalogId: firstCatalog.id,
          catalog: firstCatalog,
        }
      });
    }),

    setCatalog: assign(({ context, event }) => {
      assertEvent(event, 'set.catalog');
      return create(context, (draft) => {
        draft.eventCatalog.current.catalogId = event;
      });
    }),
  },
  actors: {},
}).createMachine({
  id: 'playground-machine',
  initial: 'idle',
  context: {
    data: {
      eventCatalog: configDefaults.play.eventCatalog,
    },
    eventCatalog: {
      current: {
        catalogId: 'ecommerce',
        catalog: {}
      },
    },
  },
  states: {
    idle: {
      always: {
        actions: ['setFirstCatalog'],
          target: 'ready'
      },
    },
    ready: {
      on: {
        'set.catalog': {
          actions: ['setCatalog'],
        },
      },
    }
  },
});
