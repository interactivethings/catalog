// @flow

import chalk from 'chalk';

export const infoMessage = (str: string) => chalk.inverse(' INFO ') + ' ' + str;
export const errorMessage = (str: string) => chalk.bgRed.black(' ERROR ') + ' ' + chalk.red(str);
export const link = (str: string) => chalk.underline.blue(str);
