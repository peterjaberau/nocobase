

const { resolve } = require('path');
const { Command } = require('commander');
const { run, nodeCheck, isPackageValid, buildIndexHtml } = require('../util');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  cli
    .command('build')
    .allowUnknownOption()
    .argument('[packages...]')
    .option('-v, --version', 'print version')
    .option('-c, --compile', 'compile the @easyflow/build package')
    .option('-r, --retry', 'retry the last failed package')
    .option('-w, --watch', 'watch compile the @easyflow/build package')
    .option('-s, --sourcemap', 'generate sourcemap')
    .option('--no-dts', 'not generate dts')
    .action(async (pkgs, options) => {
      nodeCheck();
      if (options.compile || options.watch || isPackageValid('@easyflow/build/src/index.ts')) {
        await run('yarn', ['build', options.watch ? '--watch' : ''], {
          cwd: resolve(process.cwd(), 'packages/core/build'),
        });
        if (options.watch) return;
      }
      process.env['VITE_CJS_IGNORE_WARNING'] = 'true';
      process.env.APP_ENV = 'production';

      await run('easyflow-build', [
        ...pkgs,
        options.version ? '--version' : '',
        !options.dts ? '--no-dts' : '',
        options.sourcemap ? '--sourcemap' : '',
        options.retry ? '--retry' : '',
      ]);
      buildIndexHtml(true);
    });
};
