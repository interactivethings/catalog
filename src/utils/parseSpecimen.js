import R from 'ramda';

const removeEmpty = R.filter(R.complement(R.isEmpty));
const splitType = R.compose(removeEmpty, R.split('|'));

const camelize = (str) => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

const optionToKeyValue = (option: String) => {
  const spanMatch = /^span-(\d)$/.exec(option);
  if (spanMatch) {
    const [, span] = spanMatch;
    return {span: +span};
  }

  return {
    [camelize(option)]: true
  };
};

const parseOptions = R.compose(
  R.mergeAll,
  R.map(optionToKeyValue),
  removeEmpty,
  R.split(',')
);

const parseSpecimenOptions = (optionsStr = '') => {
  const [specimen = 'code', restOptions = ''] = splitType(optionsStr);
  const options = parseOptions(restOptions);

  return {
    specimen,
    options
  };
};

const parseSpecimenBody = (bodyStr = '') => {
  try {
    return JSON.parse(bodyStr);
  } catch (e) {
    return bodyStr;
  }
};


const parseSpecimen = (body, options) => {
  return {
    ...parseSpecimenOptions(options),
    body: parseSpecimenBody(body)
  };
};

export default parseSpecimen;
