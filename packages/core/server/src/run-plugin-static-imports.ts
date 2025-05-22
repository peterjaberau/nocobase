
import { logger } from '@easyflow/logger';
import { findAllPlugins, PluginManager } from '@easyflow/server';
import { importModule } from '@easyflow/utils';

export async function runPluginStaticImports() {
  const packages = await findAllPlugins();
  for (const name of packages) {
    const { packageName } = await PluginManager.parseName(name);
    try {
      const plugin = await importModule(packageName);
      if (plugin && plugin.staticImport) {
        logger.info('run static import', { packageName });
        await plugin.staticImport();
      }
    } catch (error) {
      logger.error(error, { packageName });
      continue;
    }
  }
}
