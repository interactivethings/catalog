import { safeLoad, CORE_SCHEMA, Type, Schema } from "js-yaml";

const defaultMapBodyToProps = (parsedBody, rawBody) => parsedBody || rawBody;

const INITIAL_SEPARATOR = /[ \t]*---[ \t]*\n/;
const SEPARATOR = /\n[ \t]*---[ \t]*\n/;
const splitText = text => {
  let matched = text.match(INITIAL_SEPARATOR);
  if (matched && matched.index === 0) {
    return [void 0, text.slice(matched[0].length)];
  }
  matched = text.match(SEPARATOR);
  return matched && matched.index > -1
    ? [
        text.slice(0, matched.index),
        text.slice(matched.index + matched[0].length)
      ]
    : [void 0, text];
};

const parseYaml = (str, imports) => {
  let parsed;
  try {
    const ImportType = new Type("!import", {
      kind: "scalar",
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
  return typeof parsed === "string" ? void 0 : parsed;
};

export const parseSpecimenYamlBody = _mapBodyToProps => (
  body = "",
  imports = {}
) => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  return mapBodyToProps(parseYaml(body, imports), body);
};

export const parseSpecimenBody = _mapBodyToProps => (
  body = "",
  imports = {}
) => {
  const mapBodyToProps = _mapBodyToProps || defaultMapBodyToProps;
  const splitBody = splitText(body);
  const [props, children] = splitBody;
  return mapBodyToProps({ ...parseYaml(props, imports), children }, body);
};
