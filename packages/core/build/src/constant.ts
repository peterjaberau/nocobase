

import { Package } from '@lerna/package';
import path from 'path';

export const globExcludeFiles = [
  '!src/**/demos',
  '!src/**/fixtures',
  '!src/**/*.mdx',
  '!src/**/*.md'
];
export const EsbuildSupportExts = [
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.css',
  '.less',
  '.sass',
  '.scss',
  '.styl',
  '.txt',
  '.data',
];
export const ROOT_PATH = path.join(__dirname, '../../../../');
export const NODE_MODULES = path.join(ROOT_PATH, 'node_modules');
export const PACKAGES_PATH = path.join(ROOT_PATH, 'packages');
export const PLUGINS_DIR = ['plugins', 'samples', 'pro-plugins']
  .concat((process.env.PLUGINS_DIRS || '').split(','))
  .filter(Boolean)
  .map((name) => path.join(PACKAGES_PATH, name));
export const PRESETS_DIR = path.join(PACKAGES_PATH, 'presets');
export const getPluginPackages = (packages: Package[]) =>
  packages.filter((item) => PLUGINS_DIR.some((pluginDir) => item.location.startsWith(pluginDir)));
export const getPresetsPackages = (packages: Package[]) =>
  packages.filter((item) => item.location.startsWith(PRESETS_DIR));
export const CORE_APP = path.join(PACKAGES_PATH, 'core/app');
export const CORE_CLIENT = path.join(PACKAGES_PATH, 'core/client');
export const CJS_EXCLUDE_PACKAGES = [
  path.join(PACKAGES_PATH, 'core/build'),
  path.join(PACKAGES_PATH, 'core/cli'),
  CORE_CLIENT,
];
export const getCjsPackages = (packages: Package[]) =>
  packages
    .filter((item) => !PLUGINS_DIR.some((dir) => item.location.startsWith(dir)))
    .filter((item) => !item.location.startsWith(PRESETS_DIR))
    .filter((item) => !CJS_EXCLUDE_PACKAGES.includes(item.location));

// tar
export const tarIncludesFiles = ['package.json', 'README.md', 'dist', '!node_modules'];
export const TAR_OUTPUT_DIR = process.env.TAR_PATH ? process.env.TAR_PATH : path.join(ROOT_PATH, 'storage', 'tar');
