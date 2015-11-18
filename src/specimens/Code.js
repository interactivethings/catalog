import React, { PropTypes } from 'react';
import {text} from '../scaffold/typography';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';

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
      height: 'auto',
      border: 'none',
      color: theme.textColor,
      fontFamily: theme.fontMono,
      fontWeight: 400,
      margin: 0,
      whiteSpace: 'pre-wrap',
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

class Code extends React.Component {
  constructor() {
    super();
    this.state = {
      viewSource: true
    };
  }
  componentWillMount() {
    if (this.props.collapsed) {
      this.setState({viewSource: false});
    }
  }

  render() {
    const {theme, body, collapsed} = this.props;
    const {viewSource} = this.state;
    let styles = getStyle(theme);

    let toggle = collapsed
      ? <div style={styles.toggle} onClick={() => this.setState({viewSource: !viewSource})}>{viewSource ? 'close' : 'show example code' }</div>
      : null;

    let content = this.state.viewSource
      ? <pre style={styles.code}><code>{body.replace(/'''/g, '```')}</code></pre>
      : null;

    return (
      <section style={styles.container}>
        {toggle}
        {content}
      </section>
      );
  }
}

Code.propTypes = {
  body: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  collapsed: PropTypes.bool
};

export default Specimen(Radium(Code));
