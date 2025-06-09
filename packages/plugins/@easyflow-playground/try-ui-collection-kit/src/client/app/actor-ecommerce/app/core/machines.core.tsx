import { setup } from 'xstate';
import { data } from '../config';


export const machineDatabase = setup({}).createMachine({
  context: {
    current: {
      items: [],
      count: 0,
      firstItem: {},
      nextItem: {},
      previousItem: {},
      lastItem: {},
      recentItem: {},
    },
    metadata: [],
    data: [
      {
        name: 'categories',
        data: data.categories,
      }
    ]
  },
});
