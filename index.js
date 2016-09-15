'use strict';

const utils = require('./lib/utils');
const data = require('./lib/data');
const p = require('./lib/process');
const path = require('path');

const wiki = data.getWikiData();
const vimeo = data.getVimeoData();

console.log('-----------------------------------------');
console.log('-----------------------------------------');
console.log('-----------------------------------------');

const result = p.process(wiki, vimeo);
utils.saveJsonFile(path.join('.', 'target', 'videos.json'), result);

