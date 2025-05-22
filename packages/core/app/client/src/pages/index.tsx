

import { Application } from '@easyflow/client';
import { EasyFlowClientPresetPlugin } from '@easyflow/preset-easyflow/client';
import devDynamicImport from '../.plugins/index';

export const app = new Application({
  apiClient: {
    storageType:
      // @ts-ignore
      window['__easyflow_api_client_storage_type__'] || process.env.API_CLIENT_STORAGE_TYPE || 'localStorage',
    // @ts-ignore
    storagePrefix:
      // @ts-ignore
      window['__easyflow_api_client_storage_prefix__'] || process.env.API_CLIENT_STORAGE_PREFIX || 'EASYFLOW_',
    // @ts-ignore
    baseURL: window['__easyflow_api_base_url__'] || process.env.API_BASE_URL || '/api/',
  },
  // @ts-ignore
  publicPath: window['__easyflow_public_path__'] || process.env.APP_PUBLIC_PATH || '/',
  plugins: [EasyFlowClientPresetPlugin],
  ws: {
    // @ts-ignore
    url: window['__easyflow_ws_url__'] || process.env.WEBSOCKET_URL || '',
    // @ts-ignore
    basename: window['__easyflow_ws_path__'] || process.env.WS_PATH || '/ws',
  },
  loadRemotePlugins: true,
  devDynamicImport,
});

export default app.getRootComponent();
