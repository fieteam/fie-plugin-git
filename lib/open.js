'use strict';

const spawn = require('cross-spawn');
const log = require('fie-log')('fie-plugin-git');
const open = require('open');

module.exports = function* (fie, options) {
  const host = options.clientOptions.host || 'origin';
  const config = spawn.sync('git', ['config', '--get', `remote.${host}.url`]);
  let url = config.stdout.toString();

  if (url) {
    url = url.replace(/[\r\n]/ig, '');
    // 获取正确的 git 路径格式
    if (url.match(/^http.+\.git$/)) {
      url = url.replace(/\.git$/, '');
    } else if (url.match(/^.+@.+:.+\.git/)) {
      const tmp = url.split(':');
      tmp[0] = tmp[0].split('@')[1];
      tmp[1] = tmp[1].replace(/\.git/, '');
      url = `http://${tmp[0]}/${tmp[1]}/`;
    }
    open(url);
    log.success(`已打开远程地址: ${url}`);
  } else {
    log.error('当前项目尚未绑定远程仓库');
  }
};
