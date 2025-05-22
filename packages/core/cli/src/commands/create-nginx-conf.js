

const { resolve, posix } = require('path');
const { Command } = require('commander');
const { readFileSync, writeFileSync } = require('fs');

/**
 *
 * @param {Command} cli
 */
module.exports = (cli) => {
  cli.command('create-nginx-conf').action(async (name, options) => {
    const file = resolve(__dirname, '../../easyflow.conf.tpl');
    const data = readFileSync(file, 'utf-8');
    let otherLocation = '';
    if (process.env.APP_PUBLIC_PATH !== '/') {
      otherLocation = `location / {
        alias ${posix.resolve(process.cwd())}/node_modules/@easyflow/app/dist/client/;
        try_files $uri $uri/ /index.html;
    }`;
    }
    const replaced = data
      .replace(/\{\{cwd\}\}/g, posix.resolve(process.cwd()))
      .replace(/\{\{publicPath\}\}/g, process.env.APP_PUBLIC_PATH)
      .replace(/\{\{apiPort\}\}/g, process.env.APP_PORT)
      .replace(/\{\{otherLocation\}\}/g, otherLocation);
    const targetFile = resolve(process.cwd(), 'storage', 'easyflow.conf');
    writeFileSync(targetFile, replaced);
  });
};
