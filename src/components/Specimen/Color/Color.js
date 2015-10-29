import React, { PropTypes } from 'react';
import MetadataBlock from '../shared/MetadataBlock';
import Radium from 'radium';

class Color extends React.Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
  }
  render() {
    const {theme, colors} = this.props;
    let styles = {
      container: {
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: '20px 0',
        overflow: 'auto'
      },
      box: {
        display: 'flex',
        flex: '0 1 auto',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderTop: `1px solid ${theme.lightColor}`,
        marginRight: theme.sizeL,
        padding: `${theme.sizeL / 2}px 0`
      },
      single: {
        borderTop: 'none'
      },
      well: {
        alignSelf: 'flex-start',
        flex: '0 0 auto',
        height: '64px',
        marginRight: `${theme.sizeL / 2}px`,
        padding: `${theme.sizeL / 2}px`,
        width: '64px'
      },
      info: {
        alignSelf: 'flex-start',
        flex: '1 1 auto',
        width: '7em'
      }
    };

    let singleElement = colors.length <= 1 ? styles.single : undefined;


    let colorSwatches = colors.map( (color, key) => {
      return (
        <div key={'cg-Specimen-Color' + key} style={[styles.box, singleElement]}>
          <div style={{ ...styles.well, backgroundColor: color.value}}/>
          <div style={styles.info}>
            <MetadataBlock title={color.name} attributes={[color.value]} theme={theme}/>
          </div>
        </div>
      );
    });
    return (
      <section style={styles.container}>
        {colorSwatches}
      </section>
    );
  }
}

export default Radium(Color);
