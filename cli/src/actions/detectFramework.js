// @flow

// Framework types Catalog supports
type UNKNOWN = 'UNKNOWN';
type CREATE_REACT_APP = 'CREATE_REACT_APP';
type NEXT = 'NEXT';

type Framework = UNKNOWN | CREATE_REACT_APP | NEXT;

export default async (paths: Object): Promise<Framework> => {
  const appPackage = require(paths.appPackageJson);

  if (appPackage.devDependencies.hasOwnProperty('react-scripts')) {
    console.log('Detected Create React App');
    return Promise.resolve('CREATE_REACT_APP');
  }

  if (appPackage.dependencies.hasOwnProperty('next')) {
    console.log('Detected Next.js');
    return Promise.resolve('NEXT');
  }

  console.log('No framework detected');

  return Promise.resolve('UNKNOWN');
};
