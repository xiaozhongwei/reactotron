// Temp script to copy index.html to the required directory
// This is just short term until we use webpack or similar.
const fs = require('fs');

// Set to true to enable logging of changes made here
const shouldLog = false;

// All the folders to copy index.html to
const dirsToCopyTo = [
  'build',
  'dist',
];

// Using this to turn off the noise during build / test when its not needed
const log = (message) => {
  if (shouldLog) {
    console.log(message)
  }
}

const copyIndex = dir => {
  if (fs.existsSync(`${dir}`)) {
    log(`${dir} EXISTS - COPYING INDEX`)

    if (fs.existsSync(`${dir}/index.html`)) {
      log('PREVIOUS VERSION FOUND, REMOVING');

      fs.unlinkSync(`${dir}/index.html`);

      if (fs.existsSync(`${dir}/index.html`)) {
        log(`FILE COULD NOT BE DELETED ${dir}`);
        return false;
      }
    }

    fs.copyFileSync('src/index.html', `${dir}/index.html`);

    if (fs.existsSync(`${dir}/index.html`)) {
      log(`FILE COPIED TO ${dir} SUCESSFULLY`);

      return true;
    }
  }

  return false;
}



dirsToCopyTo.map(dir => copyIndex(dir));
