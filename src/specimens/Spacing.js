import React from 'react';
import {catalogShape} from '../CatalogPropTypes';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import {text} from '../styles/typography';

function getStyle(theme) {
  return {
    container: {
      flexBasis: '100%',
      overflow: 'auto',
      paddingBottom: '10px'
    },
    table: {
      ...text(theme),
      borderCollapse: 'collapse',
      lineHeight: 'auto',
      width: '100%',
      borderBottom: `none`
    },
    tableRow: {
      borderBottom: `1px solid ${theme.sidebarColorLine}`
    },
    head: {
      fontWeight: 'bold',
      borderBottom: `2px solid ${theme.lightColor}`
    },
    cell: {
      padding: '0 1em 0 0',
      textAlign: 'left',
      verticalAlign: 'top'
    },
    cellLast: {
      paddingRight: '0'
    },
    spacingItem: {
      margin: '0px',
      backgroundColor: theme.lightColor,
      width: '100%'
    }
  };
}

const _SpacingItem = ({name, value, color, styles}) => {
  if (color) {
    styles.spacingItem.backgroundColor = color;
  }

  return (
    <tr style={styles.tableRow}>
      <td style={styles.cell}>
        <p>{name}</p>
      </td>
      <td style={styles.cell}>
        <p>{value}</p>
      </td>
      <td style={{...styles.cell, ...styles.cellLast}}>
        <p><figure style={{...styles.spacingItem, height: value, marginBottom: '10px'}}></figure></p>
      </td>
    </tr>
  );
};

_SpacingItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string,
  styles: PropTypes.object.isRequired
};

const SpacingItem = Radium(_SpacingItem);

class Spacing extends React.Component {
  render() {
    const {catalog: {theme}, sizes} = this.props;
    const styles = getStyle(theme);

    const spacingItems = sizes.map((value, i) => <SpacingItem key={i} {...value} styles={styles} />);

    return (
      <section style={styles.container}>
        <table style={styles.table}>
          <thead style={styles.head}>
            <tr>
              <th style={styles.cell}><p>Name</p></th>
              <th style={styles.cell}><p>Value</p></th>
              <th style={{...styles.cell, ...styles.cellLast}}><p>Example</p></th>
            </tr>
          </thead>
          <tbody>
            {spacingItems}
          </tbody>
        </table>
      </section>
    );
  }
}

Spacing.propTypes = {
  catalog: catalogShape.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string
  })).isRequired
};

Spacing.defaultProps = {
};

export default Specimen()(Radium(Spacing));
