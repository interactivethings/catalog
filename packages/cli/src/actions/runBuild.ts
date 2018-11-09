import * as webpack from "webpack";
import { errorMessage } from "../utils/format";
import { rimraf, copydir, exists } from "sander";

// Print out errors
function printErrors(summary: any, errors: any) {
  console.log(errorMessage(summary));
  console.log();
  errors.forEach((err: Error) => {
    console.log(err.message || err);
    console.log();
  });
}

export default async (config: any, paths: any) => {
  const compiler = webpack(config);
  await rimraf(paths.catalogBuildDir, "*");

  // Copy app static assets to the correct location
  if (await exists(paths.appStaticSrcDir)) {
    await copydir(paths.appStaticSrcDir).to(paths.appStaticBuildDir);
  }

  // Copy Catalog's static files
  if (await exists(paths.catalogStaticSrcDir)) {
    await copydir(paths.catalogStaticSrcDir).to(paths.catalogStaticBuildDir);
  }

  return new Promise(resolve => {
    // We don't reject the promise but exit the process immediately
    compiler.run((err: any, stats: any) => {
      if (err) {
        printErrors("Failed to compile.", [err]);
        process.exit(1);
      }

      const info = stats.toJson();

      if (stats.hasErrors()) {
        printErrors("Failed to compile.", info.errors);
        process.exit(1);
      }

      if (process.env.CI && stats.hasWarnings()) {
        printErrors(
          "Failed to compile. When process.env.CI = true, warnings are treated as failures. Most CI servers set this automatically.",
          info.warnings
        );
        process.exit(1);
      }

      resolve(info);
    });
  });
};
