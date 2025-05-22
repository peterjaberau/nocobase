import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../ErrorFallback';
import { mockApp } from '@easyflow/client/demo-utils';
import { Plugin } from '@easyflow/client';

const App = () => {
  throw new Error('error message');
};

const Demo = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback.Modal} onError={console.error}>
      <App />
    </ErrorBoundary>
  );
};

class DemoPlugin extends Plugin {
  async load() {
    this.app.router.add('root', { path: '/', Component: Demo });
  }
}

const app = mockApp({ plugins: [DemoPlugin] });

export default app.getRootComponent();
