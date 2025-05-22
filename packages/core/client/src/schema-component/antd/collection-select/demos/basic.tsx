
import React from 'react';
import { mockApp } from '@easyflow/client/demo-utils';
import { SchemaComponent, Plugin } from '@easyflow/client';

const schema = {
  type: 'void',
  name: 'root',
  'x-decorator': 'FormV2',
  'x-component': 'ShowFormData',
  properties: {
    test: {
      type: 'string',
      title: 'Test',
      'x-decorator': 'FormItem',
      'x-component': 'CollectionSelect',
    },
  },
};

const Demo = () => {
  return <SchemaComponent schema={schema} />;
};

class DemoPlugin extends Plugin {
  async load() {
    this.app.router.add('root', { path: '/', Component: Demo })
  }
}

const app = mockApp({
  plugins: [DemoPlugin],
});

export default app.getRootComponent();
