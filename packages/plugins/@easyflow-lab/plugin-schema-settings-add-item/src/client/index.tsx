import { Plugin } from '@easyflow/client';
import { tableShowIndexSettingsItem } from './tableShowIndexSettingsItem'

export class PluginSchemaSettingsAddItemClient extends Plugin {
  async load() {
    this.schemaSettingsManager.addItem('blockSettings:table', tableShowIndexSettingsItem.name, tableShowIndexSettingsItem)
  }
}

export default PluginSchemaSettingsAddItemClient;
