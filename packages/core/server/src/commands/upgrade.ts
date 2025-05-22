

/* istanbul ignore file -- @preserve */

import Application from '../application';

/**
 * TODO
 */
export default (app: Application) => {
  app
    .command('upgrade')
    .ipc()
    .auth()
    .action(async (options) => {
      await app.upgrade(options);
      app.log.info(`✨  EasyFlow has been upgraded to v${app.getVersion()}`);
    });
};
