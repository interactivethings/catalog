import React from 'react';
import {catalogShape} from '../CatalogPropTypes';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';

class Color extends React.Component {
  render() {
    const {catalog: {theme}, value, name} = this.props;
    const styles = {
      text: {
        fontFamily: theme.fontFamily,
        color: theme.textColor,
        boxSizing: 'border-box',
        padding: '10px 0',
        background: theme.background
      }
    };

    return (
      <div style={{width: '100%'}}>
        <div style={{height: 120, background: value}} />
        <div style={styles.text}>
          {name} <div style={{fontFamily: theme.fontMono}}>{value}</div>
        </div>
      </div>
    );
  }
}

Color.propTypes = {
  catalog: catalogShape.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default Specimen()(Radium(Color));
