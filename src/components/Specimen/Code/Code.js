import React, { PropTypes } from 'react';

function getStyle(theme) {
  return {
    container: {
      borderRadius: '2px',
      boxSizing: 'border-box',
      display: 'block',
      margin: '10px 0',
      padding: '20px',
      width: '100%',
      height: 'auto',

      background: '#fff',
      border: '1px solid #eee',
      color: theme.textColor,
      fontFamily: theme.fontMono,
      fontSize: theme.fontS,
      lineHeight: 1.4,
      overflowX: 'scroll',
      whiteSpace: 'pre',
      position: 'relative'
    },
    toggle: {
      textDecoration: 'underline',
      cursor: 'pointer',
      marginBottom: 0,
      textAlign: 'right',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none'
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
    this.props.modifiers && this.props.modifiers.contains('collapsed') ? this.setState({viewSource: false}) : null;
  }

  render() {
    const {theme, body, modifiers} = this.props;
    let styles = getStyle(theme);

    let toggle = modifiers && modifiers.contains('collapsed')
      ? <div style={styles.toggle} onClick={this.toggleSource.bind(this)}>{this.state.viewSource ? 'hide code' : <div>show code<br/></div> }</div>
      : null;

    let content = this.state.viewSource
      ? <div dangerouslySetInnerHTML={{__html: body}}></div>
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

export default Code;
