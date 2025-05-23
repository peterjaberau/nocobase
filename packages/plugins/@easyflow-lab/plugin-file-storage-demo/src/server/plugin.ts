import { PluginFileManagerServer } from '@easyflow/plugin-file-manager';
import { Plugin } from '@easyflow/server';
import { DemoStorageType } from './DemoStorageType';

export class PluginFileStorageDemoServer extends Plugin {
  async load() {
    const plugin = this.app.pm.get(PluginFileManagerServer);
    plugin.registerStorageType('demo-storage', new DemoStorageType());
  }
}

export default PluginFileStorageDemoServer;
