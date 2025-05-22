

import { Gateway, runPluginStaticImports } from '@easyflow/server';
import { getConfig } from './config';

async function initializeGateway() {
  await runPluginStaticImports();
  const config = await getConfig();
  await Gateway.getInstance().run({
    mainAppOptions: config,
  });
}

initializeGateway();
