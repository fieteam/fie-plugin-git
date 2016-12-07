'use strict';

const fs = require('fs-extra');
const path = require('path');
const utils = require('./utils');
const semver = require('semver');
const log = require('fie-log')('fie-plugin-git');

module.exports = function* () {
  const cwd = process.cwd();
  const file = path.join(cwd, 'package.json');

  if (fs.existsSync(file)) {
    const pkg = fs.readJsonSync(file);
    const branch = utils.getBranch().replace('daily/', '');
    if (!branch) {
        // 分支不存在
      log.error('获取分支失败, 请确认当前项目是否已经初始化了 git');
      return;
    }
      // 判断一下 是否是标准的 x.y.z格式
    if (!semver.valid(branch)) {
      log.error('同步分支名失败，请确认当前分支为 daily/x.y.z 格式');
      return;
    }
    pkg.version = branch;
    fs.writeJsonSync(file, pkg);
    log.success(`已成功将版本号 ${branch} 同步至 package.json 文件中`);
  }
};
