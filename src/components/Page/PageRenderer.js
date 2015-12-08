import React, { PropTypes } from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';

import MarkdownRenderer from '../../utils/MarkdownRenderer';
import { Style as RadiumStyle } from 'radium';

import PageHeader from './PageHeader';
import MarkdownSpecimen from '../Specimen/MarkdownSpecimen';

import { heading, text, inlineElements, inlineBlockquote } from '../../scaffold/typography';
import { inlineUlist, inlineOlist } from '../../scaffold/lists';

const seqKey = require('../../utils/seqKey')('cg-Page');

class PageRenderer extends React.Component {
  render() {
    const { page, theme } = this.context;


    let margin = window.innerWidth > 640 ? 20 * 2 : 20;

    let inlineBlockquoteRules = inlineBlockquote(theme);
    inlineBlockquoteRules.blockquote = {
      ...inlineBlockquoteRules.blockquote,
      padding: `0 ${margin / 2}px`,
      marginLeft: -margin / 2 - 1,
      marginTop: 10,
      marginBottom: 10
    };

    const pageStyle = {
      boxSizing: 'border-box',
      margin: `0 ${Math.max(0, margin - 10)}px 0 ${margin}px`,
      flex: 1,
      display: 'flex',
      flexFlow: 'row wrap',
      padding: '0 0 12px 0'
    };

    const blockStyle = {
      flexBasis: '100%',
      margin: `12px 0 20px 0`
    };

    return (
      <div className='cg-Page' style={pageStyle}>
        <RadiumStyle scopeSelector='.cg-Page >' rules={{
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
        {this.styleNodes()}

        <PageHeader theme={theme} margin={margin} title={page.title} superTitle={page.superTitle} />

        {this.contentNodes()}
      </div>
    );
  }

  styleNodes() {
    return this.context.page.styles.map((src) => {
      return <link key={seqKey()} href={src} rel='stylesheet' type='text/css' />;
    });
  }

  contentNodes() {
    if (React.isValidElement(this.props.content)) {
      return this.props.content;
    }
    return MarkdownRenderer({
      text: this.props.content,
      renderer: {
        code: (body, options) => {
          return <MarkdownSpecimen key={seqKey()} body={body} options={options || ''} />;
        },
        heading: (headingText, level) => {
          return React.createElement(`h${level}`, {key: seqKey()}, headingText);
        }
      }
    });
  }
}

PageRenderer.propTypes = {
  content: PropTypes.node.isRequired
};

PageRenderer.contextTypes = {
  page: CatalogPropTypes.page.isRequired,
  theme: PropTypes.object.isRequired
};

export default PageRenderer;
