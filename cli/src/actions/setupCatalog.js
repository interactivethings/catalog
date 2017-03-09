// @flow

import {exists, copydir} from 'sander';
import prompt from 'react-dev-utils/prompt';

export default async (paths: Object) => {
  const [indexExists, htmlExists, dirExists] = await Promise.all([
    exists(paths.catalogSrcDir, 'index.js'),
    exists(paths.catalogSrcDir, 'index.html'),
    exists(paths.catalogSrcDir)
  ]);

  if (!dirExists) {
    const shouldCopyTemplateDir = await prompt(`The '${paths.unresolvedCatalogSrcDir}' directory doesn't exist. You probably haven't set up Catalog for this app. Should Catalog create one?`, true);

    if (shouldCopyTemplateDir) {
      await copydir(paths.catalogSrcTemplateDir).to(paths.catalogSrcDir);
      console.log(`'${paths.unresolvedCatalogSrcDir}' successfully created.`);
    }
  } else if (!indexExists || !htmlExists) {
    console.error(`Can't find 'index.js' and 'index.html' in ${paths.unresolvedCatalogSrcDir}'. Please make sure they exist`);
    process.exit(1);
  }
};
