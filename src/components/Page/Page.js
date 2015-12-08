import React, {Component, PropTypes} from 'react';
import {Style} from 'radium';
import { heading, text, inlineElements, inlineBlockquote } from '../../scaffold/typography';
import { inlineUlist, inlineOlist } from '../../scaffold/lists';


export default class Page extends Component {
  render() {
    const {children} = this.props;
    const {theme} = this.context;

    let margin = window.innerWidth > 640 ? 20 * 2 : 20;

    let inlineBlockquoteRules = inlineBlockquote(theme);
    inlineBlockquoteRules.blockquote = {
      ...inlineBlockquoteRules.blockquote,
      padding: `0 ${margin / 2}px`,
      marginLeft: -margin / 2 - 1,
      marginTop: 12,
      marginBottom: 24
    };

    const pageStyle = {
      boxSizing: 'border-box',
      margin: `0 ${Math.max(0, margin - 10)}px 0 ${margin}px`,
      display: 'flex',
      flexFlow: 'row wrap',
      padding: `24px 0 12px 0`
    };

    const blockStyle = {
      flexBasis: '100%',
      margin: `12px 0 20px 0`
    };

    return (
      <div className='cg-Page' style={pageStyle}>
        <Style scopeSelector='.cg-Page >' rules={{
          h1: {
            ...heading(theme, {level: 1}),
            ...blockStyle
          },
          h2: {
            ...heading(theme, {level: 2}),
            ...blockStyle
          },
          h3: {
            ...heading(theme, {level: 3}),
            ...blockStyle
          },
          h4: {
            ...heading(theme, {level: 4}),
            ...blockStyle
          },
          p: {
            ...text(theme, {level: 2}),
            ...blockStyle
          },
          ...inlineElements(theme, {selector: 'p'}),
          ...inlineUlist(theme, {
            selector: 'ul',
            style: {
              ...text(theme, {level: 2})
            }
          }),
          ...inlineOlist(theme, {
            selector: 'ol',
            style: {
              ...text(theme, {level: 2})
            }
          }),
          ...inlineBlockquoteRules,
          hr: {
            border: 'none',
            flexBasis: '100%',
            margin: 0,
            height: 0
          }
        }} />

        {children}
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node
};

Page.contextTypes = {
  theme: PropTypes.object.isRequired
};

