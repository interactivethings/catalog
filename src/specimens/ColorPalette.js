import React, { PropTypes } from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import {hcl} from 'd3-color';

const ColorPaletteItem = ({name, value, styles}) => {
  let contrastingValue = hcl(value).l < 55 ? '#fff' : '#000';
  return (<div style={{ ...styles.paletteItem,  backgroundColor: value}}>
    <div style={{...styles.textPalette, color: contrastingValue}}>
      {name} <div style={styles.mono}>{value}</div>
    </div>
  </div>);
};

class ColorPalette extends React.Component {
  render() {
    const {catalog: {theme}, colors, horizontal} = this.props;
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
        height: '111px'
      },
      mono: {
        fontFamily: theme.fontMono
      },
      paletteItem: {
        padding: '20px 10px',
        flexBasis: 'calc(100%)',
        flex: 1
      },
      text: {
        fontFamily: theme.fontFamily,
        color: theme.textColor,
        flex: '0 0 auto',
        boxSizing: 'border-box',
        padding: '10px 0',
        flexBasis: 'calc(100% - 10px)',
        background: theme.background
      },
      textPalette: {
        fontFamily: theme.fontFamily,
        color: theme.textColor,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        opacity: 0.55,
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

    const paletteItems = colors.map((color, i) => <ColorPaletteItem key={i} {...color} styles={styles} />);

    return (
      <section style={{...styles.container, ...(horizontal ? styles.rows : styles.columns)}}>
        {paletteItems}
      </section>
    );
  }
}

ColorPalette.propTypes = {
  catalog: catalogShape.isRequired,
  colors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string.isRequired
  })).isRequired,
  horizontal: PropTypes.bool
};

ColorPalette.defaultProps = {
  horizontal: false
};

export default Specimen()(Radium(ColorPalette));
