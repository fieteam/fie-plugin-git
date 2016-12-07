'use strict';

const chalk = require('chalk');

module.exports = function* () {
  const help = [
    '',
    'fie-plugin-git 插件使用帮助:',
    ' $ fie git publish                 将当前分支推送到远程 git 仓库',
    ' $ fie git publish --tag           将当前分支推送到远程 git 仓库，会打上 publish/x.y.z 的 tag',
    ' $ fie git open                    打开当前远程 git 上的项目URl',
    ' $ fie git sync                    同步 package.json 的版本号为当前分支的版本',
    '',
    '关于 git 插件的配置可查看: https://github.com/fieteam/fie-plugin-git',
    '',
    ''
  ].join('\r\n');

  process.stdout.write(chalk.magenta(help));
};
