"use strict";

const fs = require("fs");
const path = require('path');

/**
 * Create the app folders and a .gitkeep file to maintain folder structure in repository.
 */
module.exports = name =>
  new Promise((resolve, reject) => {
    const directories = ["assets", "data", "docker", "styles", "theme", "uploads"];

    for (var i = 0; i < directories.length; i++) {
        const directory = directories[i];

        const directoryPath = path.join(name, directory);

        fs.mkdirSync(directoryPath);

        // const gitkeepPath = path.join(directoryPath, ".gitkeep");

        // fs.closeSync(fs.openSync(gitkeepPath, 'w'));
    }

    return resolve(name);
  });
