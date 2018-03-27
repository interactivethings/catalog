// @flow
import { resolveAppPath } from "../utils/paths";
import { exists } from "sander";

type ConfigFile = {
  webpack?: Function,
  useBabelrc?: boolean
} | null;

export default async (): Promise<ConfigFile> => {
  const configFilePath = resolveAppPath("catalog.config.js");
  const configFileExists = await exists(configFilePath);
  return configFileExists ? require(configFilePath) : null;
};
