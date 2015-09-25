import './Page.scss';

import reqwest from 'reqwest';
import React from 'react';
import {Style} from 'radium';

import Loader from './Loader';
import MarkdownRenderer from 'MarkdownRenderer';

import Card from 'components/Card/Card';
import Specimen, {Config} from 'components/Specimen/Specimen';

const seqKey = require('utils/seqKey')('cg-Page');

class Page extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    src: React.PropTypes.string.isRequired,
    styles: React.PropTypes.arrayOf(React.PropTypes.string),
    scripts: React.PropTypes.arrayOf(React.PropTypes.string),
    theme: React.PropTypes.object.isRequired
  }

  static defaultProps = {
    styles: [],
    scripts: []
  }

  state = {
    error: null,
    content: null
  }

  componentDidMount() {
    this.props.scripts.forEach(Catalog.actions.runscript);
    this.fetchPageData();
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error}</div>;
    } else if (this.state.content) {
      return <PageRenderer content={this.state.content} styles={this.props.styles} theme={this.props.theme}/>;
    }
    return <Loader />;
  }

  fetchPageData() {
    reqwest({url: this.props.src, type: 'text'})
      .then((res) => this.setState({content: res.responseText}))
      .fail((res) => {
        return this.setState({
          error: res.statusText,
          content: null
        });
      });
  }
}

class PageRenderer extends React.Component {
  static propTypes = {
    content: React.PropTypes.string.isRequired,
    styles: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    theme: React.PropTypes.object.isRequired
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

export default Page;
