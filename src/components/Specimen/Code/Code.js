import React, { PropTypes } from 'react';
import {text} from 'scaffold/typography';
import Radium from 'radium';

function getStyle(theme) {
  return {
    container: {
      ...text(theme, {level: 3}),
      boxSizing: 'border-box',
      display: 'block',
      margin: '10px 0 20px',
      width: '100%',
      background: '#fff',
      border: '1px solid #eee',
      color: theme.textColor,
      fontFamily: theme.fontMono,
      fontWeight: 400
    },
    code: {
      ...text(theme, {level: 3}),
      padding: 20,
      boxSizing: 'border-box',
      width: '100%',
      minHeight: 200,
      height: 'auto',
      border: 'none',
      color: theme.textColor,
      fontFamily: theme.fontMono,
      fontWeight: 400,
      resize: 'vertical',
      ':focus': {
        outline: 'none',
        color: theme.brandColor
      }
    },
    toggle: {
      textDecoration: 'underline',
      cursor: 'pointer',
      marginBottom: 0,
      padding: 20,
      WebkitUserSelect: 'none',
      userSelect: 'none',
      background: '#eee'
    }
  };
}

const parser = new DOMParser();

class Code extends React.Component {
  constructor() {
    super();
    this.state = {
      viewSource: true
    };
  }
  componentWillMount() {
    this.props.modifiers && this.props.modifiers.contains('collapsed') ? this.setState({viewSource: false}) : null;
  }

  render() {
    const {theme, body, modifiers} = this.props;
    let styles = getStyle(theme);

    let doc = parser.parseFromString(body, 'text/html');
    let docBody = doc.getElementsByTagName('body')[0].innerHTML;

    let toggle = modifiers && modifiers.contains('collapsed')
      ? <div style={styles.toggle} onClick={this.toggleSource.bind(this)}>{this.state.viewSource ? 'close' : 'show example code' }</div>
      : null;

    let content = this.state.viewSource
      ? <textarea style={styles.code} value={docBody} readOnly />
      : null;

    return (
      <section style={styles.container}>
        {toggle}
        {content}
      </section>
      );
  }
  toggleSource() {
    this.setState({viewSource: !this.state.viewSource});
  }
}

Code.propTypes = {
  body: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  modifiers: PropTypes.array
};

export default Radium(Code);
