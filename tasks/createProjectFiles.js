"use strict";

const path = require("path");
const ncp = require("ncp").ncp;

/**
 * Create project files.
 */
module.exports = name =>
  new Promise((resolve, reject) => {
    const src = path.join(__dirname, "..", "files");
    const dest = name;

    return ncp(src, dest, function(err) {
      if (err) {
        return reject(err);
      }

      return resolve(name);
    });
  });
