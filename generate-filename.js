const fs = require('fs');
const path = require('path');

// Read the app.json or app.config.js file
let config;
if (fs.existsSync('app.config.js')) {
  config = require('./app.config.js');
} else if (fs.existsSync('app.config.ts')) {
  config = require('./app.config.ts');
else {
  config = JSON.parse(fs.readFileSync('app.json', 'utf8'));
}

const name = config.expo.name.replace(/\s+/g, '-').toLowerCase();
const version = config.expo.version;
const profile = process.env.EAS_BUILD_PROFILE || 'unknown';

const filename = `${name}-v${version}-${profile}.apk`;

console.log(filename);

// Write the filename to a file so we can use it in the GitHub Actions workflow
fs.writeFileSync('apk-filename.txt', filename);
