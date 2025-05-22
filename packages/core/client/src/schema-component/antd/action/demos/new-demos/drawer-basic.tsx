
import { SchemaComponent, Plugin, ISchema } from '@easyflow/client';
import { mockApp } from '@easyflow/client/demo-utils';
import React from 'react';

const schema: ISchema = {
  name: 'test',
  type: 'void',
  'x-component': 'Action',
  title: 'Open Drawer',
  properties: {
    drawer: {
      type: 'void',
      'x-component': 'Action.Drawer',
      title: 'Drawer Title',
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

const app = mockApp({ plugins: [DemoPlugin] });

export default app.getRootComponent();
