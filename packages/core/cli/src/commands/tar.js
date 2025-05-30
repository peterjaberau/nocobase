
const { resolve } = require('path');
const { Command } = require('commander');
const { run, nodeCheck, isPackageValid } = require('../util');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  cli
    .command('tar')
    .allowUnknownOption()
    .argument('[packages...]')
    .option('-v, --version', 'print version')
    .option('-c, --compile', 'compile the @easyflow/build package')
    .option('-w, --watch', 'watch compile the @easyflow/build package')
    .action(async (pkgs, options) => {
      nodeCheck();
      if (options.compile || options.watch || isPackageValid('@easyflow/build/src/index.ts')) {
        await run('yarn', ['build', options.watch ? '--watch' : ''], {
          cwd: resolve(process.cwd(), 'packages/core/build'),
        });
        if (options.watch) return;
      }
      await run('easyflow-build', [...pkgs, '--only-tar', options.version ? '--version' : '']);
    });
};
