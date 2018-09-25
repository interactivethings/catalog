// @flow

import { exists } from "sander";
import chalk from "chalk";

export default async (paths: Object) => {
  const [indexExists, htmlExists, dirExists] = await Promise.all([
    exists(paths.catalogSrcDir, "index.js"),
    exists(paths.catalogSrcDir, "index.html"),
    exists(paths.catalogSrcDir)
  ]);

  if (!dirExists) {
    console.error(chalk`
  {red The '${
    paths.unresolvedCatalogSrcDir
  }' directory doesn't exist. Please create it first.}
`);
    process.exit(1);
  } else if (!indexExists || !htmlExists) {
    console.error(chalk`
  {red Can't find 'index.js' and 'index.html' in ${
    paths.unresolvedCatalogSrcDir
  }'. Please make sure they exist.}
`);
    process.exit(1);
  }
};
