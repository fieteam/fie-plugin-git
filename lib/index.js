'use strict';

const help = require('./help');
const sync = require('./sync');
const open = require('./open');
const publish = require('./publish');

module.exports = {
  help,
  sync,
  open,
  publish
};


module.exports.default = help;
