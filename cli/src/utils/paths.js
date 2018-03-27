// @flow
import { realpathSync } from "fs";
import { resolve, isAbsolute } from "path";

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = realpathSync(process.cwd());
export const resolveAppPath = (...relativePaths: Array<string>) =>
  resolve(appDirectory, ...relativePaths);

export const resolveOwnPath = (...relativePaths: Array<string>) =>
  resolve(__dirname, "..", ...relativePaths);

export const nodePaths: Array<string> = (process.env.NODE_PATH || "")
  .split(process.platform === "win32" ? ";" : ":")
  .filter(Boolean)
  .filter(folder => !isAbsolute(folder))
  .map(path => resolveAppPath(path));

export const ensureSlash = (path: string, needsSlash: boolean) => {
  const hasSlash = path.endsWith("/");
  if (hasSlash && !needsSlash) {
    return path.substr(0, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  }
  return path;
};
