"use strict";

const fs = require("fs");
const path = require('path');

/**
 * Find and replace name in files.
 */
module.exports = name =>
  new Promise((resolve, reject) => {
    const filePaths = [
      path.join(name, ".env"),
      path.join(name, "composer.json"),
      path.join(name, "package.json"),
      path.join(name, "README.md"),
      path.join(name, "docker-compose.yml")
    ];

    const findAndReplace = filePath =>
      new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf8", function(err, data) {
          if (err) {
            return reject(err);
          }

          var newData = data.replace(/\${name}/g, name);

          fs.writeFile(filePath, newData, "utf8", function(err) {
            if (err) {
              return reject(err);
            }

            return resolve(name);
          });
        });
      });

    return Promise
      .all(filePaths.map(findAndReplace))
      .then(name => resolve(name));
  });
