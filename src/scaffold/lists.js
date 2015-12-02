import { inlineElements } from './typography';

function baseListStyle() {
  return {
    width: '100%',
    marginLeft: '2em',
    paddingLeft: 0
  };
}

export function inlineUlist(theme, {selector, style = {}}) {
  return {
    [selector]: {
      ...baseListStyle(),
      ...style
    },
    ...inlineElements(theme, {selector})
  };
}

export function inlineOlist(theme, {selector, style = {}}) {
  return {
    [selector]: {
      ...baseListStyle(),
      counterReset: 'item',
      ...style
    },
    ...inlineElements(theme, {selector})
  };
}
