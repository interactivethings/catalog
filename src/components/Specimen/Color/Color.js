import React, { PropTypes } from 'react';
import MetadataBlock from '../shared/MetadataBlock';
import Radium from 'radium';

class Color extends React.Component {
  handleClick() {
    document.execCommand('copy');
  }
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
        display: 'flex',
        flex: '0 1 auto',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginRight: theme.sizeL,
        padding: `${theme.sizeL / 2}px 0`
      },
      well: {
        alignSelf: 'flex-start',
        flex: '0 0 auto',
        height: '64px',
        marginRight: `${theme.sizeL / 2}px`,
        padding: `${theme.sizeL / 2}px`,
        width: '64px',
        borderRadius: 64
      },
      mono: {
        fontFamily: theme.fontMono,
        cursor: 'copy'
      },
      paletteItem: {
        padding: '20px',
        flex: 1
      },
      paletteText: {
        fontFamily: theme.fontFamily,
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

    let isPalette = modifiers.contains('palette') || modifiers.contains('palette-vertical');

    let colorSwatches = colors.map( (color, key) => {
      return (
        <div key={'cg-Specimen-Color' + key} style={styles.box}>
          <div style={{ ...styles.well, backgroundColor: color.value}}/>
          <div style={styles.info}>
            <MetadataBlock title={color.name} attributes={[color.value]} theme={theme}/>
          </div>
        </div>
      );
    });

    let colorPalette = colors.map( (color, key) => {
      return (
        <div key={'cg-Specimen-Color' + key} style={{ ...styles.paletteItem,  backgroundColor: color.value}}>
        <div style={{...styles.paletteText, color: color.value}} key={key}>
          {color.name} <div style={styles.mono} onClick={this.handleClick}>{color.value}</div>
        </div>
        </div>
      );
    });

    return (
      <section style={[styles.container, isPalette && !modifiers.contains('palette-vertical') ? styles.columns : styles.rows ]}>
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
