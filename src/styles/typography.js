// Base styles

const baseTextStyle = {
  fontStyle: 'normal',
  fontWeight: 400,
  textRendering: 'optimizeLegibility',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale'
};

const baseListStyle = {
  width: '100%',
  marginLeft: 0,
  paddingLeft: '2rem'
};

// Helpers

// Modular scale font size helper; level can be negative (for smaller font sizes) and positive (for larger font sizes) integers; level 0 === baseFontSize
export const getFontSize = ({baseFontSize, msRatio}, level = 0) => `${baseFontSize * Math.pow(msRatio, level)}px`;

const inlineElements = (theme, selector = '') => {
  return {
    [`${selector} i, em`]: {
      fontStyle: 'italic'
    },
    [`${selector} b, strong`]: {
      fontWeight: 700
    },
    [`${selector} a`]: {
      color: theme.linkColor,
      textDecoration: 'none'
    },
    [`${selector} a:hover`]: {
      textDecoration: 'underline'
    },
    [`${selector} code`]: {
      background: theme.bgLight,
      border: `1px solid #eee`,
      borderRadius: 1,
      display: 'inline-block',
      fontFamily: theme.fontMono,
      fontSize: `${Math.pow(theme.msRatio, -0.5)}em`,
      lineHeight: 1,
      padding: '0.12em 0.2em',
      textIndent: 0
    },
    [`${selector} img`]: {
      maxWidth: '100%'
    }
  };
};

const adjacent = (precedingSelectors = [], selector = '', style = {}) => ({
  [precedingSelectors.map((s) => `${s}+${selector}`).join(',')]: style
});

// Exports

// Text font style
export const text = (theme, level = 0) => ({
  ...baseTextStyle,
  color: theme.textColor,
  fontFamily: theme.fontFamily,
  fontSize: getFontSize(theme, level),
  lineHeight: theme.msRatio * theme.msRatio
});

// Heading font style
export const heading = (theme, level = 0) => ({
  ...baseTextStyle,
  color: theme.brandColor,
  fontFamily: theme.fontHeading,
  fontSize: getFontSize(theme, level),
  lineHeight: theme.msRatio,
  position: 'relative'
});

// Block element styles

export const textBlock = (theme, selector = 'p', level = 0) => ({
  [selector]: {
    ...text(theme, level),
    flexBasis: '100%',
    margin: `16px 0 0 0`
  },
  ...inlineElements(theme, `${selector} >`)
});

export const headingBlock = (theme, selector = 'h1', level = 0) => ({
  [selector]: {
    ...heading(theme, level),
    flexBasis: '100%',
    margin: `48px 0 0 0`
  },
  ...adjacent(['blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], selector, {
    margin: `16px 0 0 0`
  }),
  ...inlineElements(theme, `${selector} >`)
});

export const unorderedList = (theme, selector = 'ul', level = 0, depth = 0) => {
  const nestedStyles = depth < 3 ? unorderedList(theme, `${selector} > li > ul`, level, depth + 1) : {};
  return {
    [selector]: {
      ...baseListStyle,
      ...text(theme, level),
      listStyle: 'disc',
      marginTop: depth > 0 ? 0 : '16px',
      marginBottom: 0
    },
    ...inlineElements(theme, selector),
    ...nestedStyles
  };
};

export function orderedList(theme, selector = 'ol', level = 0, depth = 0) {
  const nestedStyles = depth < 3 ? orderedList(theme, `${selector} > li > ol`, level, depth + 1) : {};
  return {
    [selector]: {
      ...baseListStyle,
      ...text(theme, level),
      listStyle: 'ordinal',
      marginTop: depth > 0 ? 0 : '16px',
      marginBottom: 0
    },
    ...inlineElements(theme, selector),
    ...nestedStyles
  };
}

export const blockquote = () => {
  return {
    blockquote: {
      quotes: 'none',
      margin: '48px 0 32px 0'
    },
    'blockquote > :first-child': {
      marginTop: 0
    },
    'blockquote > :last-child': {
      marginBottom: 0
    },
    'blockquote::before, blockquote::after': {
      content: 'none'
    }
  };
};
