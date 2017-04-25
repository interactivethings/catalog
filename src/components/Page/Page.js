import React, {Component} from 'react';
import {catalogShape} from '../../CatalogPropTypes';
import PropTypes from 'prop-types';
import Radium, {Style} from 'radium';
import {headingBlock, textBlock, blockquote, unorderedList, orderedList} from '../../styles/typography';
import renderMarkdown from '../../utils/renderMarkdown';
import seqKey from '../../utils/seqKey';
import MarkdownSpecimen from '../Specimen/MarkdownSpecimen';

class Page extends Component {
  render() {
    const {children} = this.props;
    const {catalog: {theme, getSpecimen}} = this.context;

    const pageStyle = {
      boxSizing: 'border-box',
      margin: `0 20px 0 20px`,
      maxWidth: '64em',
      display: 'flex',
      flexFlow: 'row wrap',
      padding: `48px 0`,
      '@media (min-width: 640px)': {
        margin: `0 10px 0 20px`
      },
      '@media (min-width: 1000px)': {
        margin: `0 30px 0 40px`
      }
    };

    const getSpecimenKey = seqKey('Specimen');

    return (
      <div className='cg-Page' style={pageStyle}>
        {React.Children.map(children, (child) => {
          const md =  typeof child === 'string' ?
            renderMarkdown({
              text: child,
              renderer: {
                code: (body, options) => {
                  return <MarkdownSpecimen key={getSpecimenKey()} body={body} options={options || ''} getSpecimen={getSpecimen} />;
                }
              }
            }) : child;
          return md;
        })}
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
          ...orderedList(theme, 'blockquote > ol', 1),

          ':first-child': {
            marginTop: 0
          }
        }} />
      </div>
    );
  }
}

Page.propTypes = {
  children: PropTypes.node
};

Page.contextTypes = {
  catalog: catalogShape.isRequired
};

export default Radium(Page);

