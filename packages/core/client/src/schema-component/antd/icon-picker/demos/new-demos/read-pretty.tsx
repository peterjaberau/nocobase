
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
      type: 'string',
      default: 'appstoreoutlined',
      title: 'Test',
      'x-decorator': 'FormItem',
      'x-component': 'IconPicker',
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
