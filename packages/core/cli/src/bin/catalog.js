#!/usr/bin/env node
// @flow
import "babel-polyfill";
import args from "args";

args
  .command("start", "Starts the Catalog server")
  .command("build", "Builds a Catalog static site");

args.parse(process.argv);

if (!args.sub.length) {
  // no commands
  args.showHelp();
}
