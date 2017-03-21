// @flow
import webpack from 'webpack';
import {errorMessage} from '../utils/format';
import {rimraf, copydir} from 'sander';

// Print out errors
function printErrors(summary, errors) {
  console.log(errorMessage(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

export default async (config: Object, paths: Object) => {
  const compiler = webpack(config);
  await rimraf(paths.catalogBuildDir, '*');

  await copydir(paths.staticSrcDir).to(paths.staticBuildDir);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        printErrors('Failed to compile.', [err]);
        process.exit(1);
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        printErrors('Failed to compile.', info.errors);
        process.exit(1);
      }

      if (process.env.CI && stats.hasWarnings()) {
        printErrors('Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.', info.warnings);
        process.exit(1);
      }

      resolve(info);
    });
  });
};
