import React, { PropTypes } from 'react';

import MarkdownRenderer from 'MarkdownRenderer';
import { Style } from 'radium';

import Card from 'components/Card/Card';
import Specimen, {Config} from 'components/Specimen/Specimen';

import './PageRenderer.scss';

const seqKey = require('utils/seqKey')('cg-Page');

class PageRenderer extends React.Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string).isRequired,
    theme: PropTypes.object.isRequired
  }

  render() {
    return (
      <div className='cg-Page'>
        <Style scopeSelector='.cg-Page >' rules={{
          hr: {
            border: 'none',
            borderBottom: `1px solid ${this.props.theme.brandColor}`,
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
        return <Card key={seqKey()}>{children}</Card>;
      },
      renderer: {
        code: (codeBody, codeConfig) => {
          return <Specimen key={seqKey()} body={codeBody} config={Config(codeConfig)} />;
        },
        heading: (text, level) => {
          return React.createElement(`h${level}`, {key: seqKey()}, text);
        }
      }
    });
  }
}

export default PageRenderer;
