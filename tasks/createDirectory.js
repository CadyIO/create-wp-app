"use strict";

const fs = require("fs");

/**
 * Create the app directory if not exists, fail otherwise.
 */
module.exports = name =>
  new Promise((resolve, reject) => {
    if (fs.existsSync(name)) {
      return reject("Project folder already exists.");
    }

    fs.mkdirSync(name);

    return resolve(name);
  });
