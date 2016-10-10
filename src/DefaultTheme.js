/* eslint-disable key-spacing */

export const DefaultTheme = {
  // Colors
  background: '#F9F9F9',
  pageHeadingBackground: '#003B5C',
  pageHeadingTextColor: '#fff',
  pageHeadingHeight: 200,
  brandColor: '#003B5C',
  sidebarColor: '#FFFFFF',
  sidebarColorActive: '#D1312E',
  sidebarColorText: '#003B5C',
  sidebarColorTextActive: '#FF5555',
  sidebarColorLine: '#EBEBEB',
  sidebarColorHeading: '#003B5C',
  textColor: '#333333',
  codeColor: '#00263E',
  linkColor: '#FF5555',
  textMedium: '#003B5C',
  bgLight: '#F2F2F2',
  bgDark: '#333333',
  lightColor: '#D6D6D6',

  codeStyles: {
    tag: {color: '#FF5555'},
    punctuation: {color: '#535353'},
    script: {color: '#3F7397'},
    function: {color: '#FF5555'},
    keyword: {color: '#3F7397'},
    string: {color: '#00263E'}
  },

  // Patterns
  checkerboardPatternLight: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAF0lEQVQI12P4BAI/QICBFCaYBPNJYQIAkUZftTbC4sIAAAAASUVORK5CYII=',
  checkerboardPatternDark: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAAAAACoWZBhAAAAFklEQVQI12NQBQF2EGAghQkmwXxSmADZJQiZ2ZZ46gAAAABJRU5ErkJggg==',

  // Fonts
  fontFamily: "'Roboto', sans-serif",
  fontHeading: "'Roboto', sans-serif",
  fontMono: "'Source Code Pro', monospace",

  fontXs:  12,
  fontS:   14,
  fontM:   16,
  fontL:   21,
  fontXl:  28,
  fontXxl: 38,

  sizeS:   8,
  sizeM:   15,
  sizeL:   21,
  sizeXl:  28,
  sizeXxl: 38,


  // The vertical grid unit. Margin, padding, and line-height are set to multiples
  // of this value. This is the value that determines the baseline for our vertical
  // rhythm. The default value of 6px allows more fine tuned designs that still
  // obey vertical rhythm.
  baseVerticalUnit: 4,

  // The value that multiplies the baseVerticalUnit to get the baseLineHeight.
  // This gives type an ideal lineHeight.
  baseLineMulti: 10,

  // Base font size in pixels.
  baseFontSize: 16,

  // Modular scale ratio that is used to figure out all the different font sizes
  msRatio: 1.2
};

export const DefaultResponsiveSizes = [
  {name: 'small', width: 360, height: 640},
  {name: 'medium', width: 1024, height: 768},
  {name: 'large', width: 1440, height: 900},
  {name: 'xlarge', width: 1920, height: 1080}
];
