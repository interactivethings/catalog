// @flow

import {exists, copydir} from 'sander';
import prompt from 'react-dev-utils/prompt';
import {successMessage, errorMessage, infoMessage, warningMessage, question} from '../utils/format';

// $FlowIgnore
const isInteractive: boolean = process.stdout.isTTY;

export default async (paths: Object) => {
  const [indexExists, htmlExists, dirExists] = await Promise.all([
    exists(paths.catalogSrcDir, 'index.js'),
    exists(paths.catalogSrcDir, 'index.html'),
    exists(paths.catalogSrcDir)
  ]);

  if (!dirExists) {
    let shouldCopyTemplateDir = false;

    if (isInteractive) {
      shouldCopyTemplateDir = await prompt(
        warningMessage(`
The '${paths.unresolvedCatalogSrcDir}' directory doesn't exist. You probably haven't set up Catalog for this app.
    
`) +
        question(`Should Catalog create '${paths.unresolvedCatalogSrcDir}' for you?`),
        true
      );
    }

    if (shouldCopyTemplateDir) {
      await copydir(paths.catalogSrcTemplateDir).to(paths.catalogSrcDir);
      console.log(successMessage(`'${paths.unresolvedCatalogSrcDir}' successfully created.`));
    } else {
      console.error(errorMessage(`The '${paths.unresolvedCatalogSrcDir}' directory doesn't exist. Please create it first.`));
      process.exit(1);
    }
  } else if (!indexExists || !htmlExists) {
    console.error(errorMessage(`Can't find 'index.js' and 'index.html' in ${paths.unresolvedCatalogSrcDir}'. Please make sure they exist`));
    process.exit(1);
  }
};
