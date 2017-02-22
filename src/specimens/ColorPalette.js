import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import {hcl} from 'd3-color';

const _ColorPaletteItem = ({name, value, styles, width}) => {
  const contrastingValue = hcl(value).l < 55 ? '#fff' : '#000';
  return (<div style={{width, ...styles.paletteItem,  backgroundColor: value}}>
    <div style={{...styles.textPalette, color: contrastingValue}}>
      {name} <div style={styles.mono}>{value}</div>
    </div>
  </div>);
};

_ColorPaletteItem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  styles: PropTypes.object,
  width: PropTypes.string
};

const ColorPaletteItem = Radium(_ColorPaletteItem);

class ColorPalette extends React.Component {
  render() {
    const {catalog: {theme}, colors, horizontal} = this.props;
    const styles = {
      container: {
        width: '100%',
        overflow: 'hidden'
      },
      mono: {
        fontFamily: theme.fontMono
      },
      paletteItem: {
        float: 'left',
        boxSizing: 'border-box',
        padding: '20px 10px',
        '@media (max-width: 640px)': {
          width: '100%',
          float: 'none'
        }
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

    const width = `${horizontal ? 90 / colors.length : 100}%`;
    const paletteItems = colors.map((color, i) => <ColorPaletteItem key={i} {...color} styles={styles} width={width} />);

    return (
      <section style={styles.container}>
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
