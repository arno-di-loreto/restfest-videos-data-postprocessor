'use strict';

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '..', 'wiki');
const VIMEO_DIR = path.join(__dirname, '..', 'vimeo');

function wikiDataToArray(wikiData) {
  const result = [];
  const year = wikiData.event + ' ' + wikiData.year;
  for (let i = 0; i < wikiData.talks.length; i++) {
    let talk = wikiData.talks[i];
    talk.year = year;
    result.push(talk);
  }
  return result;
}

/**
 * @description: Loads all wiki yaml files in a directory
 * @param {String} [dir=__dirname/wiki] The directory name
 * @return {Object[]} An array of talks
 */
function getWikiData(dir) {
  if (!dir) {
    dir = WIKI_DIR;
  }
  const filenames = fs.readdirSync(dir);
  let result = [];
  for (let i = 0; i < filenames.length; i++) {
    const data =
      yaml.safeLoad(
        fs.readFileSync(path.join(dir, filenames[i]), 'utf8'));
    const talks = wikiDataToArray(data);
    result = result.concat(talks);
  }
  return result;
}

function getVimeoData(dir) {
  if (!dir) {
    dir = VIMEO_DIR;
  }
  const filenames = fs.readdirSync(dir);
  let result = [];
  for (let i = 0; i < filenames.length; i++) {
    const data = require(path.join(dir, filenames[i]));
    const videos = data.videos;
    result = result.concat(videos);
  }
  return result;
}

exports.getWikiData = getWikiData;
exports.getVimeoData = getVimeoData;
