import React from "react";

/*

Turns a React element into its JSX string representation.

Probably not complete

Features:

- Uses self-closing tags when no children are set
- Uses a single line for one/none prop
- Uses multiple lines for multiple props
- Sorts props alphabetically
- Removes defaultProps from output

Needs work:

- Don't use JSON.stringify: Nested objects are rendered as JSON (e.g. <div style={{"foo":"bar"}} />)

*/

const reactElementToString = (el, indent = "") => {
  if (el === void 0) {
    return "";
  }

  if (typeof el === "string") {
    return `${indent}${el}`;
  }

  const { props, type } = el;
  let displayName = "";
  let defaultProps = null;

  if (typeof type === "string") {
    displayName = type;
  } else {
    displayName = type.displayName || type.name;
    defaultProps = type.defaultProps;
  }

  const formatProp = (k, v) => {
    if (v === true) {
      return k;
    }
    if (typeof v === "string") {
      return `${k}='${v}'`;
    }
    if (React.isValidElement(v)) {
      return `${k}={${reactElementToString(v)}}`;
    }
    return `${k}={${JSON.stringify(v) || v.name || typeof v}}`;
  };

  const propKeys = Object.keys(props)
    .sort()
    .filter(k => k !== "children")
    .filter(k => props[k] !== undefined)
    .filter(k => (defaultProps ? props[k] !== defaultProps[k] : true));

  let propString = "";
  try {
    propString = propKeys
      .map(k => formatProp(k, props[k]))
      .join(`\n${indent}  `);
  } catch (e) {
    return `Couldn't stringify React Element. Try setting \`sourceText\` explicitly or use \`noSource\`.

${e}`;
  }

  const whitespaceBeforeProps =
    propKeys.length > 1 // eslint-disable-line no-nested-ternary
      ? `\n${indent}  `
      : propKeys.length === 1 ? " " : "";
  const whitespaceAfterProps = propKeys.length > 1 ? `\n${indent}` : "";

  return props.children
    ? `${indent}<${displayName}${whitespaceBeforeProps}${propString}${whitespaceAfterProps}>
${React.Children.map(props.children, c =>
        reactElementToString(c, `${indent}  `)
      ).join("\n")}
${indent}</${displayName}>`
    : `${indent}<${displayName}${whitespaceBeforeProps}${propString}${whitespaceAfterProps} />`;
};

export default reactElementToString;
