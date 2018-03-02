const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');
const kebab = require('lodash.kebabcase');
const rimraf = require('rimraf-promise');
const readability = require('node-readability');

const _defaults = {
  'save-dir': './',
  'v' : true
}


const instapooper = async function(url, options={}) {
  const opts = Object.assign(_defaults, options);

  function print() {
    if (opts['v']) {
      console.log.apply(this, arguments);
    }
  }


  async function read(url) {
    return new Promise((resolve, reject) => {
      readability(url, (err, article, meta) => {
        if (err) reject(err);
        else resolve(article);
      });
    });
  }

  async function write(file, contents) {
    // const abspath = path.resolve(file);
    return new Promise((resolve, reject) => {
      fs.writeFile(file, contents, err => {
        if (err) reject(err);
        else resolve(file);
      })
    });
  }

  async function prompt(message) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve, reject) => {
      rl.question(message, answer => {
        resolve(answer);
        rl.close();
      });
    });
  }

  async function send_to_bluetooth(file) {
    const abspath = path.resolve(file);
    return new Promise((resolve, reject) => {
      exec(`/usr/bin/open -a "/Applications/Utilities/Bluetooth File Exchange.app" "${abspath}"`, (err, stdout, stderr) => {
        console.log(stdout);
        console.error(stderr);
        if (err) reject(err);
        else resolve(abspath);
      });
    });
  }

  async function run() {

    print(`Downloading ${url}`);

    const article = await read(url);
    const filename = kebab(article.title) + '.html';
    const savePath = path.resolve(opts['save-dir'], filename);
    const page = `
  <!DOCTYPE html>
  <html lang="en">
    <head><title>${article.title}</title></head>
    <body>
      <main>
        <h1>${article.title}</h1>
        <article>${article.content}</article>
      </main>
    </body>
  </html>
  `

    print(`Writing file ${savePath}`);
    const file = await write(savePath, page);

    print('Sending to bluetooth');
    await send_to_bluetooth(file);
    await prompt('Press any key to finish up and delete file');
    
    return rimraf(file);
  }

  return run()
}

module.exports = instapooper;