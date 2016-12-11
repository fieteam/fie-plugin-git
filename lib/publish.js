'use strict';

const spawn = require('cross-spawn');
const utils = require('./utils');
const inquirer = require('inquirer');
const log = require('fie-log')('fie-plugin-git');

module.exports = function* (fie, options) {
  const isTag = options.clientOptions.tag;
  const branch = utils.getBranch();
  const version = utils.getVersion(branch);
  const tag = `publish/${version}`;
  const spawnOpt = {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit'
  };


  // 判断线上是否已存在该分支
  if (isTag) {
    const lsRemote = spawn.sync('git', ['ls-remote', 'origin', `refs/tags/${tag}`]);
    if (lsRemote.stdout.toString().indexOf(tag) !== -1) {
      log.error(`远程仓库已存在 ${tag} 这个tag了,请更换版本号再发吧,git发布中止`);
      return;
    }
  }

  // 提交分支
  const status = spawn.sync('git', ['status']);
  if (status.stdout.toString().indexOf('nothing to commit') > -1) {
    spawn.sync('git', ['add', '-A']);
    const answer = yield inquirer.prompt([{
      type: 'input',
      name: 'msg',
      message: '请输入提交注释',
      default: 'tmp:update'
    }]);
    spawn.sync('git', ['commit', '-m', answer.msg], spawnOpt);
    spawn.sync('git', ['push', 'origin', branch], spawnOpt);
  }

  // 提交tag
  if (isTag) {
    spawn.sync('git', ['tag', tag], spawnOpt);
    spawn.sync('git', ['push', 'origin', tag], spawnOpt);
  }
  log.success('发布成功');
};