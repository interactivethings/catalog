import yaml, {CORE_SCHEMA} from 'js-yaml/dist/js-yaml.min.js';

const yamlOptions = {schema: CORE_SCHEMA};

const defaultMapBodyToProps = (parsedBody, rawBody) => parsedBody || rawBody;

const parseSpecimenBody = (_mapBodyToProps: ?Function) => (body = '') => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  try {
    const parsed = yaml.safeLoad(body, yamlOptions);
    return typeof parsed === 'string' ? mapBodyToProps(body, body) : 
      Array.isArray(parsed) ? parsed.map((p) => mapBodyToProps(p, body)) :
      mapBodyToProps(parsed, body);
  } catch (e) {
    return mapBodyToProps(body, body);
  }
};

export default parseSpecimenBody;
