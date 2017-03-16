// @flow

// Framework types Catalog supports
type UNKNOWN = 'UNKNOWN';
type CREATE_REACT_APP = 'CREATE_REACT_APP';
type NEXT = 'NEXT';

type Framework = UNKNOWN | CREATE_REACT_APP | NEXT;

export default async (paths: Object): Promise<Framework> => {
  const appPackage = require(paths.appPackageJson);

  if (appPackage.devDependencies.hasOwnProperty('react-scripts')) {
    return Promise.resolve('CREATE_REACT_APP');
  }

  if (appPackage.dependencies.hasOwnProperty('next')) {
    return Promise.resolve('NEXT');
  }

  return Promise.resolve('UNKNOWN');
};
