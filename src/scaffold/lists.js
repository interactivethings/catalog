import { inlineElements } from './typography';

function baseListStyle() {
  return {
    listStyle: 'none',
    width: '100%'
  };
}

function itemRules(theme, {selector, style = {}, before = {}}) {
  return {
    ...inlineElements(theme, {selector}),
    [selector]: {
      margin: '0 0 0 -0.8em',
      textIndent: '-1.6em',
      boxSizing: 'border-box',
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
        content: '"\\2014"',
        top: '-0.15em',
        width: '1.5em'
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
        left: '-0.3em',
        top: '-0.05em',
        fontWeight: 600,
        textAlign: 'center',
        width: '1.5em'
      }
    })
  };
}
