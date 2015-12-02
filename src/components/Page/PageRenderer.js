import React, { PropTypes } from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';

import {renderPageMarkdown} from '../../utils/MarkdownRenderer';
import { Style as RadiumStyle } from 'radium';

import Card from '../Card/Card';
import MarkdownSpecimen from '../Specimen/MarkdownSpecimen';

import { heading, text, inlineElements, inlineBlockquote, code } from '../../scaffold/typography';
import { inlineUlist, inlineOlist } from '../../scaffold/lists';

function pageContainer(theme) {
  return {
    maxWidth: 671,
  };
}

const seqKey = require('../../utils/seqKey')('cg-Page');

class PageRenderer extends React.Component {
  render() {
    const { page, theme } = this.context;

    let inlineBlockquoteRules = inlineBlockquote(theme);
    inlineBlockquoteRules.blockquote = {
      ...pageContainer(theme),
      ...inlineBlockquoteRules.blockquote
    };

    let margin = window.innerWidth > 640 ? theme.sizeL * 2 : theme.sizeL;

    return (
      <div className='cg-Page' style={{margin: 0, flex: 1}}>
        <RadiumStyle scopeSelector='.cg-Page > div >' rules={{
          // h2: {
          //   ...pageContainer(theme),
          //   ...heading(theme, {level: 1})
          // },
          // h3: {
          //   ...pageContainer(theme),
          //   ...heading(theme, {level: 4}),
          //   marginTop: 50
          // },
          // h4: {
          //   ...pageContainer(theme),
          //   ...heading(theme, {level: 5}),
          //   marginTop: 50
          // },
          // p: {
          //   ...pageContainer(theme),
          //   ...text(theme, {level: 2})
          // },
          // section: {
          //   ...pageContainer(theme)
          // },
          // ...inlineElements(theme, {selector: 'p'}),
          // ...inlineUlist(theme, {
          //   selector: 'ul',
          //   style: {
          //     ...pageContainer(theme),
          //     ...text(theme, {level: 2}),
          //     marginLeft: '2.4em',
          //     boxSizing: 'border-box',
          //     width: 'calc(100% - 2.4em)'
          //   }
          // }),
          // ...inlineOlist(theme, {
          //   selector: 'ol',
          //   style: {
          //     ...pageContainer(theme),
          //     ...text(theme, {level: 2}),
          //     marginLeft: '2.4em'
          //   }
          // }),
          // ...inlineBlockquoteRules,
          // 'h1 + blockquote ~ blockquote p': {
          //   fontStyle: 'italic'
          // },
          // hr: {
          //   border: 'none',
          //   borderBottom: `1px solid ${theme.brandColor}`,
          //   margin: '16px 21px',
          //   maxWidth: '671px',
          //   height: 0
          // }
        }} />
        {this.styleNodes()}

        <div style={{
          boxSizing: 'border-box',
          margin: `0 0 ${margin}px 0`,
          position: 'relative',
          height: theme.pageHeadingHeight,
          background: theme.pageHeadingBackground
        }} >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            padding: `${theme.sizeL}px ${margin}px`
          }} >
            <h4 style={{
              ...pageContainer(theme),
              ...heading(theme, {level: 4}),
              color: theme.pageHeadingTextColor,
              opacity: 0.6,
              marginBottom: 0
            }}>{page.superTitle}</h4>
            <h2 style={{
              ...pageContainer(theme),
              ...heading(theme, {level: 2}),
              color: theme.pageHeadingTextColor,
              marginBottom: 0
            }}>{page.title}</h2>
          </div>
        </div>

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
    const {content} = this.props;
    const {theme} = this.context;
    if (React.isValidElement(content)) {
      return content;
    }
    return renderPageMarkdown(content, {
      styles: {
        h1: heading(theme, {level: 1}),
        h2: heading(theme, {level: 2}),
        h3: heading(theme, {level: 3}),
        h4: heading(theme, {level: 4}),
        p: text(theme, {level: 2}),
        li: text(theme, {level: 2}),
        code: code(theme),
        blockquote: {
          quotes: 'none',
          margin: '50px 0',
          paddingLeft: 20,
          borderLeft: `2px solid ${theme.sidebarColorLine}`
        },
        hr: {
          border: 'none',
          margin: '0',
          height: 0,
          maxWidth: 'none',
          flexBasis: '100%'
        },
        ...inlineElements(theme, {selector: ''})
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
