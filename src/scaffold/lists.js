import { inlineElements } from './typography';

function baseListStyle() {
  return {
    listStyle: 'none',
    padding: 0
  };
}

function itemRules(theme, {selector, style = {}, before = {}}) {
  return {
    ...inlineElements(theme, {selector}),
    [selector]: {
      margin: '0 0 0 0.2em',
      textIndent: '-1em',
      ...style
    },
    [`${selector}:before`]: {
      color: theme.brandColor,
      display: 'inline-block',
      fontSize: '0.7em',
      position: 'relative',
      textIndent: 0,
      ...before
    }
  };
}

export function inlineUlist(theme, {selector, style = {}}) {
  return {
    [selector]: {
      ...baseListStyle(),
      ...style
    },
    ...itemRules(theme, {
      selector: `${selector} > li`,
      before: {
        content: '"\\25CF"',
        top: '-0.15em',
        width: `${(0.8 / 0.7)}em`
      }
    })
  };
}

export function inlineOlist(theme, {selector, style = {}}) {
  return {
    [selector]: {
      ...baseListStyle(),
      counterReset: 'item',
      ...style
    },
    ...itemRules(theme, {
      selector: `${selector} > li`,
      before: {
        content: 'counter(item)',
        counterIncrement: 'item',
        left: '-0.6em',
        fontWeight: 600,
        textAlign: 'right',
        width: `${(1 / 0.7)}em`
      }
    })
  };
}
