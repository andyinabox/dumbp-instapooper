#! /usr/bin/env node
const instapooper = require('../index.js');

const argv = require('minimist')(process.argv.slice(2));

const url = argv._[0];
delete argv['_'];

if (!url) {
  console.error('usage: instapooper url [--save-dir=./]');
}

(async () => {
  await instapooper(url, argv);
})();

