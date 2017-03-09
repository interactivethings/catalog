// @flow

// Framework types Catalog supports
type UNKNOWN = 'UNKNOWN';
type CREATE_REACT_APP = 'CREATE_REACT_APP';
type NEXT = 'NEXT';

type Framework = UNKNOWN | CREATE_REACT_APP | NEXT;

export default async (paths: Object): Promise<Framework> => {
  return Promise.resolve('UNKNOWN');
};
