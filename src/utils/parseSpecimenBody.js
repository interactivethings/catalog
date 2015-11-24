import yaml, {CORE_SCHEMA} from 'js-yaml';

const yamlOptions = {schema: CORE_SCHEMA};

const defaultMapBodyToProps = (parsedBody, rawBody) => parsedBody || rawBody;

const parseSpecimenBody = (mapBodyToProps = defaultMapBodyToProps) => (body = '') => {
  try {
    const parsed = yaml.safeLoad(body, yamlOptions);
    return typeof parsed === 'string' ? mapBodyToProps(body, body) : mapBodyToProps(parsed, body);
  } catch (e) {
    return mapBodyToProps(body, body);
  }
};

export default parseSpecimenBody;
