// @flow

import chalk from 'chalk';

export const infoMessage = (str: string) => str;
export const errorMessage = (str: string) => chalk.red(str);
export const successMessage = (str: string) => chalk.green('✔︎') + ' ' + str;
export const link = (str: string) => chalk.underline(str);
