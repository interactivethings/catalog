function setType(theme, {fontSize, verticalUnits}) {
  return {
    fontSize: fontSize + 'px',
    lineHeight: `${(verticalUnits * theme.baseVerticalUnit) / fontSize}em`
  };
}

function modularScale(opts) {
  let { base, ratios, length } = opts;
  let scaleArray = [base];

  Array(length).fill().map( ( ) => {
    let a = scaleArray[scaleArray.length - 1];
    scaleArray.push(a * ratios);
  });

  return scaleArray.reverse();
}

export function text(theme, {level}) {
  let style = {
    color: theme.textColor,
    fontFamily: theme.fontFamily,
    fontStyle: 'normal',
    fontWeight: 400,
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased'
  };

  let fontSizes = modularScale({
    base: theme.baseFontSize - 4,
    ratios: theme.msRatio,
    length: 3
  });

  return {
    ...style,
    ...setType(theme, {fontSize: fontSizes[level], verticalUnits: fontSizes[level] / 2.5})
  };
}

export function link(theme) {
  return {
    color: theme.linkColor,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    }
  };
}

export function code(theme) {
  return {
    background: theme.bgLight,
    border: `1px solid ${theme.lightColor}`,
    margin: '1px 5px',
    borderRadius: 3,
    color: '#555',
    display: 'inline-block',
    fontFamily: theme.fontMono,
    lineHeight: 1,
    padding: '0.05em 0.317em 0.18em',
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
      fontWeight: 600
    },
    [`${selector} a`]: linkStyle,
    [`${selector} a:hover`]: linkHoverStyle,
    [`${selector} code`]: code(theme),
    [`${selector} img`]: {
      maxWidth: '100%'
    }
  };
}

export function inlineBlockquote(theme) {
  return {
    blockquote: {
      quotes: 'none',
      marginTop: 0,
      marginBottom: 50,
      marginRight: 0,
      borderLeft: `1px solid ${theme.lightColor}`
    },
    'blockquote :first-child': {
      marginTop: 0
    },
    'blockquote :last-child': {
      marginBottom: 0
    },
    'blockquote::before, blockquote::after': {
      content: 'none'
    },
    'blockquote p': {
      ...text(theme, {level: 1})
    },
    ...inlineElements(theme, {selector: 'blockquote p'})
  };
}


export function heading(theme, {level}) {
  let style = {
    color: theme.brandColor,
    flexBasis: '100%',
    fontFamily: theme.fontHeading,
    fontStyle: 'normal',
    fontWeight: 400,
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    width: '100%'
  };

  const fontSizes = modularScale({
    base: theme.baseFontSize,
    ratios: theme.msRatio,
    length: 6
  });


  return {
    ...style,
    ...setType(theme, {fontSize: fontSizes[level], verticalUnits: theme.baseLineMulti}),
    margin: `0 0 ${fontSizes[level]}px 0`
  };
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
