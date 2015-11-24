import R from 'ramda';

const removeEmpty = R.filter(R.complement(R.isEmpty));
const splitType = R.compose(removeEmpty, R.split('|'));
const splitOptions = R.compose(removeEmpty, R.split(','));

const camelize = (str) => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

const mapOptionToProp = (mapper, option) => {
  const match = mapper.test.exec(option);
  if (match) {
    const [, value] = match;
    return mapper.map(value);
  }
  return null;
};

const defaultMapOptionsToProps = [
  {test: /^span-(\d)$/, map: (v) => ({span: +v})}
];

const optionToKeyValue = (mapOptionsToProps = []) => (option: String) => {
  for (let mapper of mapOptionsToProps.concat(defaultMapOptionsToProps)) {
    const prop = mapOptionToProp(mapper, option);
    if (prop !== null) {
      return prop;
    }
  }
  return {
    [camelize(option)]: true
  };
};

const parseSpecimenOptions = (mapOptionsToProps) => (options = '') => {
  const [, restOptions = ''] = splitType(options);
  return R.mergeAll(splitOptions(restOptions).map(optionToKeyValue(mapOptionsToProps)));
};

export default parseSpecimenOptions;
