import React, { PropTypes } from 'react';
import Radium from 'radium';

class Color extends React.Component {
  render() {
    const {theme, colors, modifiers} = this.props;
    let styles = {
      container: {
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: '20px 0',
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
        alignSelf: 'flex-start',
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


    let isPalette = modifiers.contains('palette') || modifiers.contains('palette-horizontal');

    let colorSwatches = colors.map( (color, key) => {
      return (
        <div key={'cg-Specimen-Color' + key} style={{ ...styles.box}}>
          <div style={{...styles.well, background: color.value}}/>
          <div style={{...styles.text}} key={key}>
            {color.name} <div style={styles.mono}>{color.value}</div>
          </div>
        </div>
      );
    });

    let colorPalette = colors.map( (color, key) => {
      return (
        <div key={'cg-Specimen-Color' + key} style={{ ...styles.paletteItem,  backgroundColor: color.value}}>
          <div style={{...styles.textPalette, color: color.value}} key={key}>
            {color.name} <div style={styles.mono}>{color.value}</div>
          </div>
        </div>
      );
    });

    return (
      <section style={[styles.container, isPalette && !modifiers.contains('palette-horizontal') ? styles.columns : styles.rows ]}>
        {isPalette ? colorPalette : colorSwatches }
      </section>
    );
  }
}

Color.propTypes = {
  colors: PropTypes.array.isRequired,
  modifiers: PropTypes.array,
  theme: PropTypes.object.isRequired
};

export default Radium(Color);
