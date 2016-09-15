'use strict';

const fs = require('fs');
const yaml = require('js-yaml');

/**
 * @description Saves data as a json file
 * @param {String} filename JSON filename
 * @param {Object} data Data to save
 */
function saveJsonFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function loadYamlFile(filename) {
  yaml.safeLoad(
        fs.readFileSync(filename, 'utf8'));
}

function loadJsonFile(filename) {
  return require(filename);
}

exports.saveJsonFile = saveJsonFile;
exports.loadYamlFile = loadYamlFile;
exports.loadJsonFile = loadJsonFile;
