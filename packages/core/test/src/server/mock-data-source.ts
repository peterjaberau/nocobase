/**
 * This file is part of the EasyFlow (R) project.
 * Copyright (c) 2020-2024 EasyFlow Co., Ltd.
 * Authors: EasyFlow Team.
 *
 * This project is dual-licensed under AGPL-3.0 and EasyFlow Commercial License.
 * For more information, please refer to: https://www.easyflow.com/agreement.
 */

import { CollectionManager, DataSource } from '@easyflow/data-source-manager';
import { waitSecond } from '@easyflow/test';

export class MockDataSource extends DataSource {
  static testConnection(options?: any): Promise<boolean> {
    return Promise.resolve(true);
  }

  async load(): Promise<void> {
    await waitSecond(1000);
  }

  createCollectionManager(options?: any): any {
    return new CollectionManager(options);
  }
}
