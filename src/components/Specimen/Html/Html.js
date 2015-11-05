import React, { PropTypes } from 'react';
import Radium from 'radium';
import {code} from 'scaffold/typography';

const PADDING = 3;
const SIZE = 20;

function getStyle(theme) {
  return {
    container: {
      position: 'relative',
      flexBasis: '100%'
    },
    toggle: {
      border: PADDING + 'px solid transparent',
      color: theme.lightColor,
      cursor: 'pointer',
      display: 'inline-block',
      fontFamily: theme.fontMono,
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 600,
      height: SIZE + 'px',
      lineHeight: SIZE + 'px',
      padding: PADDING + 'px',
      position: 'absolute',
      right: -PADDING + 'px',
      top: -(SIZE + 2 * PADDING) + 'px',
      userSelect: 'none',
      ':hover': {
        color: theme.textColor
      }
    },
    source: {
      ...code(theme),
      padding: SIZE + 'px'
    },
    content: {
      background: `url(${theme.checkerboardPatternLight})`,
      border: 'none',
      borderRadius: '2px',
      boxSizing: 'border-box',
      display: 'block',
      padding: '20px',
      position: 'relative',
      width: '100%'
    },
    light: {
      background: `url(${theme.checkerboardPatternLight})`
    },
    dark: {
      background: `url(${theme.checkerboardPatternDark})`
    },
    plain: {
      background: 'transparent',
      padding: '0'
    },
    plain_light: {
      background: theme.bgLight,
      padding: '20px'
    },
    plain_dark: {
      background: theme.bgDark,
      padding: '20px'
    }
  };
}

class Html extends React.Component {
  constructor() {
    super();
    this.state = {
      viewSource: false
    };
  }

  componentDidMount() {
    const {modifiers} = this.props;
    modifiers
      .filter( modifier => modifier === 'run-script')
      .map( () => this.refs.specimen.querySelectorAll('script'))
      .forEach(script => Catalog.actions.runscript(script[0]));
  }

  render() {
    const {theme, modifiers, body} = this.props;
    let styles = getStyle(theme);

    if (modifiers.contains('plain') && modifiers.contains('light')) {
      modifiers.push('plain_light');
    } else if (modifiers.contains('plain') && modifiers.contains('dark')) {
      modifiers.push('plain_dark');
    }

    let modifierStyles = modifiers.map( (modifier) => {
      return styles[modifier];
    }).concat();

    let source = this.state.viewSource
      ? <pre style={styles.source}>{body}</pre>
      : null;

    let toggle = !modifiers.contains('no-source')
      ? <div style={styles.toggle} onClick={this.toggleSource.bind(this)}>&lt;&gt;</div>
      : null;

    return (
      <div ref='specimen' style={styles.container} className='cg-Specimen-Html'>
        {toggle}
        <div style={[styles.content, modifierStyles]} dangerouslySetInnerHTML={{__html: body}} />
        {source}
      </div>
    );
  }

  toggleSource() {
    this.setState({viewSource: !this.state.viewSource});
  }
}

Html.propTypes = {
  body: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  modifiers: PropTypes.array
};

export default Radium(Html);
