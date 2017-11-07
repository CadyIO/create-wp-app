"use strict";

/**
 * Print success message.
 */
module.exports = name =>
  new Promise((resolve, reject) => {
    console.log("");
    console.log("");
    console.log(`New WordPress app ${name} created successfully!`);
    console.log("");
    console.log("Change directory into your new app and run `npm i` or `yarn` to install modules.");
    console.log("Open the .env file and add your configuration variables.");
    console.log("Then  run `npm run start` or `yarn start` to start your new WordPress site!");
    console.log("");
    console.log("");

    return resolve(name);
  });
