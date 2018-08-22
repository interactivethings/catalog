// Base styles

const baseTextStyle = {
  fontStyle: "normal",
  fontWeight: 400,
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  letterSpacing: "normal"
};

// Helpers

// Modular scale font size helper; level can be negative (for smaller font sizes) and positive (for larger font sizes) integers; level 0 === baseFontSize
export const getFontSize = ({ baseFontSize, msRatio }, level = 0) =>
  `${baseFontSize / 16 * Math.pow(msRatio, level)}rem`;

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
  position: "relative"
});
