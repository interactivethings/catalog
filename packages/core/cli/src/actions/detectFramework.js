// @flow
import { resolveAppPath } from "../utils/paths";
import { exists } from "sander";

// Framework types Catalog supports
type UNKNOWN = "UNKNOWN";
type CREATE_REACT_APP = "CREATE_REACT_APP";
type NEXT = "NEXT";

export type Framework = UNKNOWN | CREATE_REACT_APP | NEXT;

export default async (): Promise<Framework> => {
  const appPackagePath = resolveAppPath("package.json");
  const appPackageExists = await exists(appPackagePath);

  if (!appPackageExists) {
    return "UNKNOWN";
  }

  const appPackage = require(appPackagePath);
  if (
    (appPackage.dependencies &&
      appPackage.dependencies.hasOwnProperty("react-scripts")) ||
    (appPackage.devDependencies &&
      appPackage.devDependencies.hasOwnProperty("react-scripts"))
  ) {
    return "CREATE_REACT_APP";
  }

  if (
    (appPackage.dependencies &&
      appPackage.dependencies.hasOwnProperty("next")) ||
    (appPackage.devDependencies &&
      appPackage.devDependencies.hasOwnProperty("next"))
  ) {
    return "NEXT";
  }

  return "UNKNOWN";
};
