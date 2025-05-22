

import { Application, EasyFlowBuildInPlugin } from '@easyflow/client';

export const app = new Application({
  apiClient: {
    baseURL: process.env.API_BASE_URL,
  },
  plugins: [EasyFlowBuildInPlugin],
});

export default app.getRootComponent();
