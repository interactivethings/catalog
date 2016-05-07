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
  try {
    return yaml.safeLoad(str, yamlOptions);
  } catch (e) {
    return null;
  }
};

export const parseSpecimenYamlBody = (_mapBodyToProps: ?Function) => (body = '') => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  return mapBodyToProps(parseYaml(body), body);
};

export const parseSpecimenBody = (_mapBodyToProps: ?Function) => (body = '') => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  const splitBody = splitText(body);
  const [props, children] = splitBody;
  const parsed = parseYaml(props);
  return typeof parsed === 'string' || parsed === null ? mapBodyToProps({children: body}, body) :
    mapBodyToProps({...parsed, children}, body);
};


// export default parseSpecimenBody;
