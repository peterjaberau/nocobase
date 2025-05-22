

import { Migration } from '../migration';

export default class extends Migration {
  on = 'afterSync'; // 'beforeLoad' or 'afterLoad'
  appVersion = '<1.0.0-alpha.3';

  async up() {
    const items = await this.pm.repository.find();
    for (const item of items) {
      if (item.name.startsWith('@easyflow/plugin-')) {
        item.set('name', item.name.substring('@easyflow/plugin-'.length));
        await item.save();
      }
    }
  }
}
