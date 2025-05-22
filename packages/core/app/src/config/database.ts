

import { parseDatabaseOptionsFromEnv } from '@easyflow/database';

export async function parseDatabaseOptions() {
  return await parseDatabaseOptionsFromEnv();
}
