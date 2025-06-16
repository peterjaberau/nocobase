import React, { forwardRef } from 'react';
import { createActorContext } from '@xstate/react';
import { fromPromise, setup, assign, createActor } from 'xstate';
import Fuse from 'fuse.js';
import { Box } from '@chakra-ui/react';
import { useSearch } from '../hooks/useSearch'

export const searchMachine = setup({
  actions: {
    createInstance: assign(({ context }) => {
      context.instance = new Fuse(context.data, context.options);
    }),
    updateResults: assign(({ context, event }) => {
      context.results = event.output;
    }),
    updateQuery: assign(({ context, event }) => {
      context.query = event.query;
      context.searchId = Date.now();
    }),
  },
  actors: {
    createFuzzyInstance: fromPromise(async ({ context }: any) => {
      return context.instance.search(context.query);
    }),
    runFuzzySearch: fromPromise(async ({ context }: any) => {
      return context.instance.search(context.query);
    }),
  },
}).createMachine({
  id: 'search',
  initial: 'idle',
  context: ({ input }: any) =>
    ({
      instance: null,
      data: input.data || [],
      query: input.query ?? '',
      options: input.options ?? { keys: [] },
      searchId: null,
      results: [],
    }) as any,
  entry: ['createInstance'],
  states: {
    idle: {
      on: {
        QUERY_CHANGE: {
          target: 'debouncing',
          actions: ['updateQuery'],
        },
      },
    },
    debouncing: {
      after: {
        300: { target: 'searching' },
      },
      on: {
        QUERY_CHANGE: {
          actions: ['updateQuery'], // stays in debouncing if more input
        },
      },
    },
    searching: {
      invoke: {
        src: 'runFuzzySearch',
        onDone: {
          target: 'idle',
          guard: ({ context, event }: any) => event.input?.searchId === context.searchId,
          actions: ['updateResults'],
        },
      },
    },
  },
});

export const SearchContext: any = createActorContext(searchMachine);

export const SearchProvider = ({ children}) => {
  return (
    <SearchContext.Provider>
      {children}
    </SearchContext.Provider>
  );
};

export const SearchRoot = ({ props }: any) => {

  return (
    <SearchProvider>
      <Search {...props} />
    </SearchProvider>
  )
}



const Search = ({ props }: any) => {

  return <Box {...props} />;
};
