// @flow

import chalk from "chalk";

export const infoMessage = (str: string) => str;
export const infoMessageDimmed = (str: string) => chalk.dim(str);
export const errorMessage = (str: string) => chalk.red(`✖ ${str}`);
export const warningMessage = (str: string) => chalk.yellow(str);
export const question = (str: string) => `❯ ${str}`;
export const successMessage = (str: string) => chalk.green(`✔︎ ${str}`);
export const link = (str: string) => chalk.underline(str);
