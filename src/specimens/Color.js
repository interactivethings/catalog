import React, { PropTypes } from 'react';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';

class Color extends React.Component {
  render() {
    const {theme, value, name, palette, paletteHorizontal} = this.props;
    let styles = {
      container: {
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        overflow: 'auto',
        flexBasis: '100%'
      },
      rows: {
        flexDirection: 'row'
      },
      columns: {
        flexDirection: 'column'
      },
      box: {
        flexBasis: `calc(${ 1 / 6 * 100}%)`
      },
      well: {
        alignSelf: 'stretch',
        flex: '0 0 auto',
        height: '111px',
        marginRight: 10
      },
      mono: {
        fontFamily: theme.fontMono
      },
      paletteItem: {
        padding: '20px',
        flexBasis: 'calc(100% - 10px)',
        flex: 1
      },
      text: {
        fontFamily: theme.fontFamily,
        color: theme.textColor,
        marginRight: 10,
        flex: '0 0 auto',
        boxSizing: 'border-box',
        padding: '10px',
        flexBasis: 'calc(100% - 10px)',
        background: theme.background
      },
      textPalette: {
        fontFamily: theme.fontFamily,
        color: theme.textColor,
        filter: 'invert(60%) hue-rotate(0deg)',
        mixBlendMode: 'difference',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        opacity: 0.5,
        ':hover': {
          opacity: 1
        }
      },
      info: {
        alignSelf: 'flex-start',
        flex: '1 1 auto',
        width: '7em'
      }
    };


    let isPalette = palette || paletteHorizontal;

    if (isPalette) {
      return (
        <section style={[styles.container, paletteHorizontal ? styles.rows : styles.columns ]}>
          <div style={{ ...styles.paletteItem,  backgroundColor: value}}>
            <div style={{...styles.textPalette, color: value}}>
              {name} <div style={styles.mono}>{value}</div>
            </div>
          </div>
        </section>
      );
    }

    return (
      // <section style={[styles.container, styles.columns]}>
        <div style={{flexBasis: '100%'}}>
          <div style={{...styles.well,background: value}} />
          <div style={{...styles.text}}>
            {name} <div style={styles.mono}>{value}</div>
          </div>
        </div>
      // </section>
    );
  }
}

Color.propTypes = {
  theme: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  palette: PropTypes.bool,
  paletteHorizontal: PropTypes.bool
};

Color.defaultProps = {
  palette: false,
  paletteHorizontal: false
};

const mapBodyToProps = (parsed) => ({
  ...parsed,
  span: parsed.palette || parsed.paletteHorizontal ? null : 1
});

export default Specimen(mapBodyToProps)(Radium(Color));
