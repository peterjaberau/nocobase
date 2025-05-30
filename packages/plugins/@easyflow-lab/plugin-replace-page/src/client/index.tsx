import { Plugin } from '@easyflow/client';
import { CustomAuthLayout } from './AuthLayout';

export class PluginReplacePageClient extends Plugin {
  async load() {
    this.app.router.add('auth', {
      Component: CustomAuthLayout,
    })
  }
}

export default PluginReplacePageClient;
