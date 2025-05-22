

const chalk = require('chalk');
const { Command } = require('commander');
const { resolve } = require('path');
const { run, promptForTs, runAppCommand, hasCorePackages, downloadPro, hasTsNode, checkDBDialect } = require('../util');
const { existsSync, rmSync } = require('fs');
const { readJSON, writeJSON } = require('fs-extra');
const deepmerge = require('deepmerge');

async function updatePackage() {
  const sourcePath = resolve(__dirname, '../../templates/create-app-package.json');
  const descPath = resolve(process.cwd(), 'package.json');
  const sourceJson = await readJSON(sourcePath, 'utf8');
  const descJson = await readJSON(descPath, 'utf8');
  const json = deepmerge(descJson, sourceJson);
  await writeJSON(descPath, json, { spaces: 2, encoding: 'utf8' });
}

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  cli
    .command('upgrade')
    .allowUnknownOption()
    .option('--raw')
    .option('--next')
    .option('-S|--skip-code-update')
    .action(async (options) => {
      checkDBDialect();
      if (options.skipCodeUpdate) {
        await runAppCommand('upgrade');
      } else {
        await run('easyflow', ['update-deps']);
        await run('easyflow', ['upgrade', '--skip-code-update']);
      }
    });
};
