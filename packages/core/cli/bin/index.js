#!/usr/bin/env node

const chalk = require('chalk');
const { initEnv, genTsConfigPaths } = require('../src/util');

initEnv();
genTsConfigPaths();

if (require('semver').satisfies(process.version, '<16')) {
  console.error(chalk.red('[easyflow cli]: Node.js version must be >= 16'));
  process.exit(1);
}

if (__dirname.includes(' ')) {
  console.error(chalk.red(`[easyflow cli]: PathError: Invalid path "${process.cwd()}"`));
  console.error(
    chalk.red('[easyflow cli]: PathError: The path cannot contain spaces. Please modify the path and try again.'),
  );
  process.exit(1);
}

const cli = require('../src/cli');

cli.parse(process.argv);
