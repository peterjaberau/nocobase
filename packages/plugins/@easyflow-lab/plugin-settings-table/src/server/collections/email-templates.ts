import { defineCollection } from '@easyflow/database';

export default defineCollection({
  name: 'samplesEmailTemplates',
  fields: [
    {
      type: 'string',
      name: 'subject',
    },
    {
      type: 'string',
      name: 'content',
    },
  ],
});
