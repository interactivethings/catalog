import React, {Component, PropTypes} from 'react';
import {Style} from 'radium';
import { headingBlock, textBlock, blockquote, unorderedList, orderedList } from '../../styles/typography';

export default class Page extends Component {
  render() {
    const {children} = this.props;
    const {theme} = this.context;

    const margin = window.innerWidth > 640 ? 20 * 2 : 20;

    const pageStyle = {
      boxSizing: 'border-box',
      margin: `0 ${Math.max(0, margin - 10)}px 0 ${margin}px`,
      maxWidth: '64em',
      display: 'flex',
      flexFlow: 'row wrap',
      padding: `24px 0 48px 0`
    };

    return (
      <div className='cg-Page' style={pageStyle}>
        <Style scopeSelector='.cg-Page >' rules={{
          // Text styles
          ...headingBlock(theme, 'h1', 4),
          ...headingBlock(theme, 'h2', 3),
          ...headingBlock(theme, 'h3', 2),
          ...headingBlock(theme, 'h4', 1),
          ...headingBlock(theme, 'h5'),
          ...headingBlock(theme, 'h6'),
          ...textBlock(theme, 'p'),
          ...unorderedList(theme, 'ul'),
          ...orderedList(theme, 'ol'),
          hr: {
            border: 'none',
            flexBasis: '100%',
            margin: 0,
            height: 0
          },

          // Blockquote styles
          ...blockquote(theme),
          ...headingBlock(theme, 'blockquote > h1', 4),
          ...headingBlock(theme, 'blockquote > h2', 3),
          ...headingBlock(theme, 'blockquote > h3', 2),
          ...headingBlock(theme, 'blockquote > h4', 1),
          ...headingBlock(theme, 'blockquote > h5', 1),
          ...headingBlock(theme, 'blockquote > h6', 1),
          ...textBlock(theme, 'blockquote > p', 1),
          ...unorderedList(theme, 'blockquote > ul', 1),
          ...orderedList(theme, 'blockquote > ol', 1)

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

