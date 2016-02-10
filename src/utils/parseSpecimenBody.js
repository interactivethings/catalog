import yaml, {CORE_SCHEMA} from 'js-yaml/dist/js-yaml.min.js';

const yamlOptions = {schema: CORE_SCHEMA};

const defaultMapBodyToProps = (parsedBody, rawBody) => parsedBody || rawBody;

const isUndefined = (d) => d === void 0;

const C_DASH = '-';
const C_NEWLINE = '\n';

const split = (text) => {
  let i = -1;
  while (++i < text.length) {
    if (
      text.charAt(i) === C_DASH &&
      text.charAt(i + 1) === C_DASH &&
      text.charAt(i + 2) === C_DASH &&
      text.charAt(i + 3) === C_NEWLINE
    ) {
      return [text.slice(0, i), text.slice(i + 4)];
    }
  }
  return [text];
};

const parseSpecimenBody = (_mapBodyToProps: ?Function) => (body = '') => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  const [props, children] = split(body);
  let parsed;
  try {
    parsed = yaml.safeLoad(props, yamlOptions);
  } catch (e) {
    parsed = body;
  }

  return typeof parsed === 'string' ? mapBodyToProps({children: body}, body) : 
    Array.isArray(parsed) ? parsed.map((p) => mapBodyToProps(isUndefined(children) ? p : {...p, children}, body)) :
    mapBodyToProps(isUndefined(children) ? parsed : {...parsed, children}, body);
};

export default parseSpecimenBody;
