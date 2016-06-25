import R from 'ramda';
import mapSpecimenOption from './mapSpecimenOption';

const removeEmpty = R.filter(R.complement(R.isEmpty));
const splitType = R.compose(removeEmpty, R.split('|'));
const splitOptions = R.compose(removeEmpty, R.split(','));

const camelize = (str) => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

const nothing = () => null;
const mapSpanToProp = mapSpecimenOption(/^span-(\d)$/, (v) => ({span: +v}));
const camelizeOption = (option) => ({[camelize(option)]: true});

const optionToKeyValue = (mapOptionsToProps) => (option) => {
  for (let mapper of [mapOptionsToProps, mapSpanToProp]) {
    if (typeof mapper === 'function') {
      const prop = mapper(option);
      if (prop !== null) {
        return prop;
      }
    }
  }
  return camelizeOption(option);
};

const parseSpecimenOptions = (mapOptionsToProps = nothing) => (options = '') => {
  const [, restOptions = ''] = splitType(options);
  return R.mergeAll(splitOptions(restOptions).map(optionToKeyValue(mapOptionsToProps)));
};

export default parseSpecimenOptions;
