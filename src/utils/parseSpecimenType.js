import R from 'ramda';

const getType = R.compose(R.toLower, R.head, R.split('|'));

const parseSpecimenType = (options = '') => R.or(getType(options), 'raw-code');

export default parseSpecimenType;
