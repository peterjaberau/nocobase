
import React from 'react';
import { mockApp } from '@easyflow/client/demo-utils';
import { SchemaComponent, Plugin, ISchema } from '@easyflow/client';

const schema: ISchema = {
  type: 'void',
  name: 'root',
  'x-decorator': 'FormV2',
  'x-component': 'ShowFormData',
  'x-pattern': 'readPretty',
  properties: {
    test: {
      type: 'number',
      title: 'Test',
      default: 1.23,
      'x-decorator': 'FormItem',
      'x-component': 'Percent',
    },
  },
}
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
