

import { defineCollection } from '@easyflow/database';

export default defineCollection({
  name: 'applicationPlugins',
  dumpRules: 'required',
  migrationRules: ['overwrite', 'schema-only'],
  repository: 'PluginManagerRepository',
  origin: '@easyflow/server',
  fields: [
    { type: 'string', name: 'name', unique: true },
    { type: 'string', name: 'packageName', unique: true },
    { type: 'string', name: 'version' },
    { type: 'boolean', name: 'enabled' },
    { type: 'boolean', name: 'installed' },
    { type: 'boolean', name: 'builtIn' },
    { type: 'json', name: 'options' },
  ],
});
