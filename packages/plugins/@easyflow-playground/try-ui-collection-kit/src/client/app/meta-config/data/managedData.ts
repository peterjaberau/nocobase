import { assign, setup } from 'xstate';

import { useDataConverter } from '../dataformats/formatRegistry';
import type { Path } from '../utility/path';
import { dataAt, dataAt as resolveDataAt } from '../utility/resolveDataAtPath';
import { pathToString } from '../utility/pathUtils';
import _ from 'lodash';
import type { UndoManager } from './undoManager';
import type { SessionMode } from '../store/sessionMode';

export const managedDataMachine = setup({
  types: {
    context: {} as {
      shallowData?: any;
      unparseableDataString: string | any;
      mode?: string;
      undoManager: any; //UndoManager
      [key: string]: any;
    },
    events: {} as
      | { type: 'SET_DATA'; value: any }
      | { type: 'UPDATE_DATA'; value: (data: any) => boolean | void }
      | { type: 'SET_DATA_AT'; path: string[]; value: any }
      | { type: 'REMOVE_DATA_AT'; path: string[] }
      | { type: 'SET_UNPARSED'; string: string }
      | { type: 'GET_UNDO_MANAGER' },
  },
  actions: {
    setData: assign(({ context, event }: any) => {
      context.shallowData = event.value;
      context.unparseableDataString = null;
    }),
    setUnparsed: assign(({ context, event }: any) => {
      const { parse } = useDataConverter();
      try {
        const parsed = parse(event.string);
        context.shallowData = parsed;
        context.unparseableDataString = null;
      } catch {
        context.unparseableDataString = event.string;
      }
    }),
    updateData: assign(({ context, event }: any) => {
      const cloned = _.cloneDeep(context.shallowData);
      const result = event.updater(cloned);
      if (result !== false) {
        context.shallowData = cloned;
      }
    }),
    setDataAt: assign(({ context, event }) => {
      const { path, value }: any = event;
      const current = resolveDataAt(path, context.shallowData);
      if (_.isEqual(current, value)) return {};
      const cloned = _.cloneDeep(context.shallowData);
      _.set(cloned, pathToString(path), value);
      context.shallowData = cloned;
    }),
    removeDataAt: assign(({ context, event }: any) => {
      const { path } = event;
      const cloned = _.cloneDeep(context.shallowData);

      if (path.length === 0) {
        context.shallowData = {};
        return {};
      }

      const parent = resolveDataAt(path.slice(0, -1), cloned);
      if (Array.isArray(parent)) {
        const index = path[path.length - 1] as number;
        if (parent.length <= index) return {};
        parent.splice(index, 1);
      } else {
        _.unset(cloned, pathToString(path));
      }

      context.shallowData = cloned;
    }),
    getUndoManager: assign(({ context }) => {
      console.log('getUndoManager called', context);
      // if (context.undoManager) return {};
      // const undo = useDebouncedRefHistory(
      //   () => {
      //     const { stringify } = useDataConverter();
      //     return context.unparseableDataString ?? stringify(context.shallowData);
      //   },
      //   {
      //     capacity: 150,
      //     debounce: 100,
      //   },
      // );

      // context.undoManager = undo;
    }),
  },
}).createMachine({
  context: ({ input }) => ({
    shallowData: {},
    unparseableDataString: null,
    mode: 'data-editor',
    undoManager: null,
    ...input,
  }),
  on: {
    SET_DATA: {
      actions: assign(({ event }) => ({
        shallowData: event.value,
        unparseableDataString: null,
      })),
    },
    SET_UNPARSED: {
      actions: assign(({ event }) => {
        const { parse } = useDataConverter();
        try {
          const parsed = parse(event.string);
          return {
            shallowData: parsed,
            unparseableDataString: null,
          };
        } catch {
          return {
            unparseableDataString: event.string,
          };
        }
      }),
    },
    UPDATE_DATA: {
      actions: assign(({ context, event }) => {
        const cloned = _.cloneDeep(context.shallowData);
        const result = event.updater(cloned);
        if (result !== false) {
          return { shallowData: cloned };
        }
        return {};
      }),
    },
    SET_DATA_AT: {
      actions: assign(({ context, event }) => {
        const { path, value } = event;
        const current = resolveDataAt(path, context.shallowData);
        if (_.isEqual(current, value)) return {};
        const cloned = _.cloneDeep(context.shallowData);
        _.set(cloned, pathToString(path), value);
        return { shallowData: cloned };
      }),
    },
    REMOVE_DATA_AT: {
      actions: assign(({ context, event }) => {
        const { path } = event;
        const cloned = _.cloneDeep(context.shallowData);

        if (path.length === 0) {
          return { shallowData: {} };
        }

        const parent = resolveDataAt(path.slice(0, -1), cloned);
        if (Array.isArray(parent)) {
          const index = path[path.length - 1] as number | any;
          if (parent.length <= index) return {};
          parent.splice(index, 1);
        } else {
          _.unset(cloned, pathToString(path));
        }

        return { shallowData: cloned };
      }),
    },
    GET_UNDO_MANAGER: {
      actions: assign(({ context }) => {
        if (context.undoManager) return {};
        const undo = useDebouncedRefHistory(
          () => {
            const { stringify } = useDataConverter();
            return context.unparseableDataString ?? stringify(context.shallowData);
          },
          {
            capacity: 150,
            debounce: 100,
          },
        );

        return { undoManager: undo };
      }),
    },
  },
});

