function setType(theme, {fontSize, verticalUnits}) {
  return {
    fontSize,
    lineHeight: (verticalUnits * theme.baseVerticalUnit) / fontSize
  };
}

export function text(theme, {level}) {
  let style = {
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 300
  };

  switch (level) {
  case 1:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontL, verticalUnits: 8}),
      margin: '0 0 13px 0'
    };
  case 2:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontM, verticalUnits: 6}),
      margin: '0 0 16px 0'
    };
  case 3:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontS, verticalUnits: 5}),
      margin: '0 0 6px 0'
    };
  default:
    return style;
  }
}

export function link(theme) {
  return {
    color: theme.brandColor,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  };
}

export function code(theme) {
  return {
    background: '#e1e1e1',
    borderRadius: 3,
    color: '#555',
    display: 'inline-block',
    fontFamily: theme.fontMono,
    fontWeight: 300,
    lineHeight: 1,
    padding: '0.178em 0.317em',
    textIndent: 0
  };
}

export function inlineElements(theme, {selector = ''}) {
  let linkStyle = link(theme);
  let linkHoverStyle = linkStyle[':hover'];
  delete linkStyle[':hover'];

  return {
    [`${selector} i, em`]: {
      fontStyle: 'italic'
    },
    [`${selector} b, strong`]: {
      fontWeight: 400
    },
    [`${selector} a`]: linkStyle,
    [`${selector} a:hover`]: linkHoverStyle,
    [`${selector} code`]: code(theme)
  };
}

export function inlineBlockquote(theme) {
  return {
    blockquote: {
      quotes: 'none',
      margin: 0
    },
    'blockquote:before, blockquote:after': {
      content: 'none'
    },
    'blockquote p': text(theme, {level: 1}),
    ...inlineElements(theme, {selector: 'blockquote p'})
  };
}

export function heading(theme, {level}) {
  let style = {
    color: theme.brandColor,
    fontFamily: theme.fontHeading,
    fontStyle: 'normal',
    fontWeight: 500
  };

  switch (level) {
  case 1:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontXxl, verticalUnits: 12}),
      margin: '0 0 16px 0',
      fontWeight: 600
    };
  case 2:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontXl, verticalUnits: 8}),
      margin: '0 0 12px 0'
    };
  case 3:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontL, verticalUnits: 6}),
      margin: '23px 0 2px 0',
      color: theme.textMedium
    };
  case 4:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontM, verticalUnits: theme.baseLineMulti}),
      margin: '0 0 -2px 0',
      color: theme.textMedium
    };
  case 5:
    return {
      ...style,
      ...setType(theme, {fontSize: theme.fontS, verticalUnits: 5}),
      margin: '0 0 1px 0',
      color: theme.textMedium
    };
  default:
    return style;
  }
}

export function line(theme, {level}) {
  switch (level) {
    case 1:
      return {
        ...setType(theme, {fontSize: theme.fontXxl, verticalUnits: 12})
      };
    case 2:
      return {
        ...setType(theme, {fontSize: theme.fontXl, verticalUnits: 8})
      };
    case 3:
      return {
        ...setType(theme, {fontSize: theme.fontL, verticalUnits: 6})
      };
    case 4:
      return {
        ...setType(theme, {fontSize: theme.fontM, verticalUnits: theme.baseLineMulti})
      };
    case 5:
      return {
        ...setType(theme, {fontSize: theme.fontS, verticalUnits: 5})
      };
    default:
      return {};
  }
}
