import React, { PropTypes } from 'react';
import Radium from 'radium';
import reqwest from 'reqwest';
import normalizeReferences from './normalizeReferences';

import {text, link, code} from 'scaffold/typography';


function getStyle(theme) {
  return {
    button: {
      ...text(theme, {level: 2}),
      ...link(theme),
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'inline-block',
      float: 'left',
      margin: '0.6em 1.333em 0 0',
      padding: 0,
      ':focus': {
        outline: 'none'
      }
    },
    active: {
      textDecoration: 'underline'
    },
    source: {
      ...code(theme),
      background: '#eee',
      clear: 'both',
      display: 'block',
      border: 'none',
      height: '15em',
      width: '90%'
    }
  };
}

class Project extends React.Component {

  static propTypes = {
    sourceFiles: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
  }

  state= {
    tab: null,
    sourceCode: null
  }

  componentDidMount() {
    this.loadSourceCode();
  }

  componentDidUpdate() {
    if (!this.state.sourceCode) {
      this.loadSourceCode();
    }
  }

  render() {
    let {sourceFiles, theme} = this.props;
    let styles = getStyle(theme);

    let fileTabs = sourceFiles.length > 1
      ? sourceFiles.map( (file, i) => {
        let activeTab = i === parseInt(this.state.tab, 10)
          ? styles.active
          : undefined;
        return (<button
          onClick={this.selectTab.bind(this, this)}
          key={i}
          data-tab-id={i}
          style={[styles.button, activeTab ]}
        >
        {file.target}
        </button>);
      })
      : null;

    let sourceView = this.state.tab
      ? <textarea
          style={styles.source}
          value={this.state.sourceCode ? this.state.sourceCode : 'Loading …'}
          readOnly='true'
        />
      : null;

    return (
        <div className='cg-Specimen-TabbedSourceView'>
          {fileTabs}
          {sourceView}
        </div>
      );
  }

  selectTab(_context, evt) {
    let nextTab = evt.currentTarget.getAttribute('data-tab-id');
    _context.setState({
      sourceCode: null,
      tab: nextTab === this.state.tab
        ? null
        : nextTab
    });
  }
  loadSourceCode() {
    let {sourceFiles} = this.props;
    if (!this.state.tab) {
      return;
    }
    let file = sourceFiles[this.state.tab];
    let requests = [reqwest({ url: file.source, type: 'text', headers: { Accept: 'text/plain,*/*' } }) ];
    Promise.all(requests).then(((_this) =>{
      return (res) => {
        let content = res.map((d) => {
          return d.responseText;
        });
        let sourceCode = _this.parseSourceCode(...content);
        _this.setState({
          sourceCode: normalizeReferences(_this.props.rootPath, _this.props.files, sourceCode)
        });
      };
    })(this)).catch(((_this) =>{
      return (res) => {
        return _this.setState({
          error: res.statusText,
          children: null
        });
      };
    })(this));
  }

  parseSourceCode(source, template) {
    if (template) {
      let doc = new DOMParser().parseFromString(source, 'text/html');
      let ref = doc.querySelectorAll('[data-catalog-project-expose]');
      ref.map( item => {
        item.removeAttribute('data-catalog-project-expose');
      });
      template.replace('${yield}', doc.body.innerHTML);
      return template;
    }
    return source;
  }
}

export default Radium(Project);
