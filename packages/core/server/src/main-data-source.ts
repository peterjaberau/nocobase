

import { DataSourceOptions, SequelizeDataSource } from '@easyflow/data-source-manager';

export class MainDataSource extends SequelizeDataSource {
  init(options: DataSourceOptions = {}) {
    const { acl, resourceManager, database } = options;

    this.acl = acl;
    this.resourceManager = resourceManager;

    this.collectionManager = this.createCollectionManager({
      collectionManager: {
        database,
        collectionsFilter: (collection) => {
          return collection.options.loadedFromCollectionManager;
        },
      },
    });

    if (options.useACL !== false) {
      this.resourceManager.use(this.acl.middleware(), { group: 'acl', after: 'auth' });
    }
  }
}
