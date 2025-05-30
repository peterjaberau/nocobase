
const chalk = require('chalk');
const { Command } = require('commander');
const { resolve } = require('path');
const { run, promptForTs, runAppCommand, hasCorePackages, downloadPro, hasTsNode, checkDBDialect } = require('../util');
const { existsSync, rmSync } = require('fs');
const { readJSON, writeJSON } = require('fs-extra');
const deepmerge = require('deepmerge');

const rmAppDir = () => {
  // If ts-node is not installed, do not do the following
  const appDevDir = resolve(process.cwd(), './storage/.app-dev');
  if (existsSync(appDevDir)) {
    rmSync(appDevDir, { recursive: true, force: true });
  }
};

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  cli
    .command('update-deps')
    .option('--force')
    .allowUnknownOption()
    .action(async (options) => {
      if (hasCorePackages() || !hasTsNode()) {
        await downloadPro();
        return;
      }
      const pkg = require('../../package.json');
      let distTag = 'latest';
      if (pkg.version.includes('alpha')) {
        distTag = 'alpha';
      } else if (pkg.version.includes('beta')) {
        distTag = 'beta';
      }
      const { stdout } = await run('npm', ['info', `@easyflow/cli@${distTag}`, 'version'], {
        stdio: 'pipe',
      });
      if (!options.force && pkg.version === stdout) {
        await downloadPro();
        rmAppDir();
        return;
      }
      const descPath = resolve(process.cwd(), 'package.json');
      const descJson = await readJSON(descPath, 'utf8');
      const sourcePath = resolve(__dirname, '../../templates/create-app-package.json');
      const sourceJson = await readJSON(sourcePath, 'utf8');
      if (descJson['dependencies']?.['@easyflow/cli']) {
        descJson['dependencies']['@easyflow/cli'] = stdout;
      }
      if (descJson['devDependencies']?.['@easyflow/devtools']) {
        descJson['devDependencies']['@easyflow/devtools'] = stdout;
      }
      const json = deepmerge(descJson, sourceJson);
      await writeJSON(descPath, json, { spaces: 2, encoding: 'utf8' });
      await run('yarn', ['install']);
      await downloadPro();
      rmAppDir();
    });
};
