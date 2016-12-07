'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  /**
   * getBranch
   * @param  {string} cwd 当前路径
   * @return {string}
   */
  getBranch(cwd) {
    cwd = cwd || process.cwd();
    const headerFile = path.join(cwd, '.git/HEAD');
    const gitVersion = fs.existsSync(headerFile) && fs.readFileSync(headerFile).toString();

    if (gitVersion) {
      const arr = gitVersion.split(/refs[/\\]heads[/\\]/g);
      const v = arr && arr[1];
      if (v) {
        return v.trim();
      }
    }
    return '';
  },
};
