import {safeLoad, CORE_SCHEMA, Type, Schema} from 'js-yaml';

const defaultMapBodyToProps = (parsedBody, rawBody) => parsedBody || rawBody;

const INITIAL_SEPARATOR = '---\n';
const SEPARATOR = '\n---\n';
const splitText = (text) => {
  if (text.indexOf(INITIAL_SEPARATOR) === 0) {
    return [void 0, text.slice(4)];
  }
  const i = text.indexOf(SEPARATOR);
  return i > -1 ?
    [text.slice(0, i), text.slice(i + 5)] :
    [void 0, text];
};

const parseYaml = (str, imports) => {
  let parsed;
  try {
    const ImportType = new Type('!import', {
      kind: 'scalar',
      // TODO: Gracefully handle missing imports
      // resolve(key) {
      //   return imports.hasOwnProperty(key);
      // },
      construct(key) {
        return imports[key];
      }
    });

    const yamlOptions = {
      schema: Schema.create(CORE_SCHEMA, [ImportType])
    };

    parsed = safeLoad(str, yamlOptions);
  } catch (e) {
    parsed = void 0;
  }
  return typeof parsed === 'string' ? void 0 : parsed;
};

export const parseSpecimenYamlBody = (_mapBodyToProps) => (body = '', imports = {}) => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  return mapBodyToProps(parseYaml(body, imports), body);
};

export const parseSpecimenBody = (_mapBodyToProps) => (body = '', imports = {}) => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  const splitBody = splitText(body);
  const [props, children] = splitBody;
  return mapBodyToProps({...parseYaml(props, imports), children}, body);
};
