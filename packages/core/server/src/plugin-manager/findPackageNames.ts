

import fg from 'fast-glob';
import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';
import { PluginManager } from './';

function splitNames(name: string) {
  return (name || '').split(',').filter(Boolean);
}

async function trim(packageNames: string[]) {
  const nameOrPkgs = _.uniq(packageNames).filter(Boolean);
  const names = [];
  for (const nameOrPkg of nameOrPkgs) {
    const { name, packageName } = await PluginManager.parseName(nameOrPkg);
    try {
      await PluginManager.getPackageJson(packageName);
      names.push(name);
    } catch (error) {
      //
    }
  }
  return names;
}

const excludes = [
  '@easyflow/plugin-audit-logs',
  '@easyflow/plugin-backup-restore',
  '@easyflow/plugin-charts',
  '@easyflow/plugin-disable-pm-add',
  '@easyflow/plugin-mobile-client',
  '@easyflow/plugin-mock-collections',
  '@easyflow/plugin-multi-app-share-collection',
  '@easyflow/plugin-notifications',
  '@easyflow/plugin-snapshot-field',
  '@easyflow/plugin-workflow-test',
];

export async function findPackageNames() {
  const patterns = [
    './packages/plugins/*/package.json',
    './packages/plugins/*/*/package.json',
    './packages/pro-plugins/*/*/package.json',
    './storage/plugins/*/package.json',
    './storage/plugins/*/*/package.json',
  ];
  try {
    const packageJsonPaths = await fg(patterns, {
      cwd: process.cwd(),
      absolute: true,
      ignore: ['**/external-db-data-source/**'],
    });
    const packageNames = await Promise.all(
      packageJsonPaths.map(async (packageJsonPath) => {
        const packageJson = await fs.readJson(packageJsonPath);
        return packageJson.name;
      }),
    );
    const easyflowPlugins = await findEasyflowPlugins();
    const { APPEND_PRESET_BUILT_IN_PLUGINS = '', APPEND_PRESET_LOCAL_PLUGINS = '' } = process.env;
    return trim(
      packageNames
        .filter((pkg) => pkg && !excludes.includes(pkg))
        .concat(easyflowPlugins)
        .concat(splitNames(APPEND_PRESET_BUILT_IN_PLUGINS))
        .concat(splitNames(APPEND_PRESET_LOCAL_PLUGINS)),
    );
  } catch (error) {
    return [];
  }
}

async function getPackageJson() {
  const packageJson = await fs.readJson(
    path.resolve(process.env.NODE_MODULES_PATH, '@easyflow/preset-easyflow/package.json'),
  );
  return packageJson;
}

async function findEasyflowPlugins() {
  try {
    const packageJson = await getPackageJson();
    const pluginNames = Object.keys(packageJson.dependencies).filter((name) => name.startsWith('@easyflow/plugin-'));
    return trim(pluginNames.filter((pkg) => pkg && !excludes.includes(pkg)));
  } catch (error) {
    return [];
  }
}

export async function findBuiltInPlugins() {
  const { APPEND_PRESET_BUILT_IN_PLUGINS = '' } = process.env;
  try {
    const packageJson = await getPackageJson();
    return trim(packageJson.builtIn.concat(splitNames(APPEND_PRESET_BUILT_IN_PLUGINS)));
  } catch (error) {
    return [];
  }
}

export async function findLocalPlugins() {
  const { APPEND_PRESET_LOCAL_PLUGINS = '' } = process.env;
  const plugins1 = await findEasyflowPlugins();
  const plugins2 = await findPackageNames();
  const builtInPlugins = await findBuiltInPlugins();
  const packageJson = await getPackageJson();
  const items = await trim(
    _.difference(
      plugins1.concat(plugins2).concat(splitNames(APPEND_PRESET_LOCAL_PLUGINS)),
      builtInPlugins.concat(await trim(packageJson.deprecated)),
    ),
  );
  return items;
}

export async function findAllPlugins() {
  const builtInPlugins = await findBuiltInPlugins();
  const localPlugins = await findLocalPlugins();
  return _.uniq(builtInPlugins.concat(localPlugins));
}

export const packageNameTrim = trim;

export async function appendToBuiltInPlugins(nameOrPkg: string) {
  const APPEND_PRESET_BUILT_IN_PLUGINS = process.env.APPEND_PRESET_BUILT_IN_PLUGINS || '';
  const keys = APPEND_PRESET_BUILT_IN_PLUGINS.split(',');
  const { name, packageName } = await PluginManager.parseName(nameOrPkg);
  if (keys.includes(packageName)) {
    return;
  }
  if (keys.includes(name)) {
    return;
  }
  process.env.APPEND_PRESET_BUILT_IN_PLUGINS += ',' + nameOrPkg;
}
