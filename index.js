#!/usr/bin/env node

'use strict';

const program = require("commander");
const fs = require("fs");
const path = require('path');

const tasksDirectory = path.join(__dirname, "tasks");

const createDirectory = require(path.join(tasksDirectory, "createDirectory"));
const createAppDirectories = require(path.join(tasksDirectory, "createAppDirectories"));
const createProjectFiles = require(path.join(tasksDirectory, "createProjectFiles"));
const setProjectName = require(path.join(tasksDirectory, "setProjectName"));
const success = require(path.join(tasksDirectory, "success"));

/**
 * Execute the program functions.
 */
const execute = name => {
  createDirectory(name)
    .then(createAppDirectories)
    .then(createProjectFiles)
    .then(setProjectName)
    .then(success)
    .catch(err => {
      console.log(err);
    });
};

/**
 * Run program.
 */
program
  .version("1.0.0")
  .usage("<name>")
  .arguments("<name>")
  .description("Create a WordPress website with Docker support.")
  .action(execute);

/**
 * Read arguments to program.
 */
program.parse(process.argv);

/**
 * Validate args.
 */
if (program.args.length === 0) {
  console.error("Please provide a name for the app.");

  process.exit(1);
}
