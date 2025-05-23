import { defineCollection } from '@easyflow/database';

export default defineCollection({
  name: 'samplesFileStorages',
  fields: [
    {
      type: 'string',
      name: 'type',
    },
    {
      type: 'jsonb',
      name: 'options',
      defaultValue: {},
    },
  ],
});
