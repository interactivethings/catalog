#!/usr/bin/env node
process.env.NODE_ENV = "development";

import args from "args";
import { errorMessage } from "../utils/format";
import { startServer } from "../server";

// Parse env

args
  .option(
    "port",
    "Port on which the Catalog server runs",
    4000,
    (port: string) => parseInt(port, 10)
  )
  .option("https", "Use https", false)
  .option("host", "Host", "localhost")
  .option("proxy", "Proxy")
  .option("babelrc", "Use local .babelrc file (defaults to true)");

const cliOptions = args.parse(process.argv, {
  value: "[source directory]",
  mri: {
    boolean: ["babelrc"]
  }
});

startServer(args.sub[0], cliOptions).catch(err => {
  console.error(errorMessage("Could not start Catalog\n\n" + err.stack + "\n"));
  process.exit(1);
});
