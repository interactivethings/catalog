import React, { PropTypes } from 'react';

import MarkdownRenderer from 'MarkdownRenderer';
import { Style as RadiumStyle } from 'radium';

import Card from 'components/Card/Card';
import Specimen, {Config} from 'components/Specimen/Specimen';

import { heading, text, inlineElements, inlineBlockquote } from 'scaffold/typography';
import { inlineUlist, inlineOlist } from 'scaffold/lists';

function pageContainer(theme) {
  return {
    maxWidth: 671,
    paddingLeft: theme.sizeL,
    paddingRight: theme.sizeL
  };
}

const seqKey = require('utils/seqKey')('cg-Page');

class PageRenderer extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string).isRequired,
    theme: PropTypes.object.isRequired
  }

  render() {
    const { theme } = this.props;

    let inlineBlockquoteRules = inlineBlockquote(theme);
    inlineBlockquoteRules.blockquote = {
      ...pageContainer(theme),
      ...inlineBlockquoteRules.blockquote
    };

    return (
      <div className='cg-Page' style={{margin: `0 ${theme.sizeXxl}px`}}>
        <RadiumStyle scopeSelector='.cg-Page >' rules={{
          h1: {
            ...pageContainer(theme),
            ...heading(theme, {level: 1})
          },
          p: {
            ...pageContainer(theme),
            ...text(theme, {level: 2})
          },
          ...inlineElements(theme, {selector: 'p'}),
          ...inlineUlist(theme, {
            selector: 'ul',
            style: {
              ...pageContainer(theme),
              ...text(theme, {level: 2})
            }
          }),
          ...inlineOlist(theme, {
            selector: 'ol',
            style: {
              ...pageContainer(theme),
              ...text(theme, {level: 2})
            }
          }),
          ...inlineBlockquoteRules,
          'h1 + blockquote ~ blockquote p': {
            fontStyle: 'italic'
          },
          hr: {
            border: 'none',
            borderBottom: `1px solid ${theme.brandColor}`,
            margin: '16px 21px',
            maxWidth: '671px',
            height: 0
          }
        }} />
        {this.styleNodes()}
        {this.contentNodes()}
      </div>
    );
  }

  styleNodes() {
    return this.props.styles.map((src) => {
      return <link key={seqKey()} href={src} rel='stylesheet' type='text/css' />;
    });
  }

  contentNodes() {
    return MarkdownRenderer({
      text: this.props.content,
      section: (children) => {
        return <Card key={seqKey()} theme={this.props.theme}>{children}</Card>;
      },
      renderer: {
        code: (codeBody, codeConfig) => {
          return <Specimen key={seqKey()} body={codeBody} config={Config(codeConfig)} />;
        },
        heading: (headingText, level) => {
          return React.createElement(`h${level}`, {key: seqKey()}, headingText);
        }
      }
    });
  }
}

export default PageRenderer;
