

const { Command } = require('commander');
const { run, isDev, isProd, promptForTs, downloadPro, checkDBDialect } = require('../util');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  const { APP_PACKAGE_ROOT, SERVER_TSCONFIG_PATH } = process.env;
  cli
    .allowUnknownOption()
    .option('-h, --help')
    .option('--ts-node-dev')
    .action(async (options) => {
      checkDBDialect();
      const cmd = process.argv.slice(2)?.[0];
      if (cmd === 'install') {
        await downloadPro();
      }
      if (isDev()) {
        promptForTs();
        await run('tsx', [
          '--tsconfig',
          SERVER_TSCONFIG_PATH,
          '-r',
          'tsconfig-paths/register',
          `${APP_PACKAGE_ROOT}/src/index.ts`,
          ...process.argv.slice(2),
        ]);
      } else if (isProd()) {
        await run('node', [`${APP_PACKAGE_ROOT}/lib/index.js`, ...process.argv.slice(2)]);
      }
    });
};
