import yaml, {CORE_SCHEMA} from 'js-yaml/dist/js-yaml.min.js';

const yamlOptions = {schema: CORE_SCHEMA};

const defaultMapBodyToProps = (parsedBody, rawBody) => parsedBody || rawBody;

const SPLITTER = '---\n';
const splitText = (text) => {
  const i = text.indexOf(SPLITTER);
  return i > -1 ?
    [text.slice(0, i), text.slice(i + 4)] :
    [(void 0), text];
};

const parseYaml = (str) => {
  let parsed;
  try {
    parsed = yaml.safeLoad(str, yamlOptions);
  } catch (e) {
    parsed = void 0;
  }
  return typeof parsed === 'string' ? void 0 : parsed;
};

export const parseSpecimenYamlBody = (_mapBodyToProps: ?Function) => (body = '') => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  return mapBodyToProps(parseYaml(body), body);
};

export const parseSpecimenBody = (_mapBodyToProps: ?Function) => (body = '') => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  const splitBody = splitText(body);
  const [props, children] = splitBody;
  return mapBodyToProps({...parseYaml(props), children}, body);
};
