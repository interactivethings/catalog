import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import {text} from '../styles/typography';
import renderMarkdown from '../utils/renderMarkdown';

function getStyle(theme) {
  return {
    section: {
      ...text(theme),
      display: 'flex',
      flexFlow: 'row wrap',
      minWidth: 'calc(100% + 10px)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: `1px solid ${theme.sidebarColorLine}`
    },
    head: {
      background: theme.sidebarColorLine,
      color: theme.sidebarColorHeading,
      border: 'none',
      fontWeigth: 'bold'
    },
    cell: {
      padding: '0px 25px',
      textAlign: 'left',
      border: `1px solid ${theme.sidebarColorLine}`
    }
  };
}

const Cell = (val) => typeof val === 'string'
  ? renderMarkdown({text: val})
  : val || <p style={{opacity: 0.2}}>—</p>;

class Table extends React.Component {
  render() {
    const {columns, rows, catalog: {theme}} = this.props;
    const styles = getStyle(theme);
    const tableKeys = columns ? columns : rows.reduce( (index, row) => index
      .concat(Object.keys(row)), [])
      .filter((value, i, self) => self.indexOf(value) === i);

    return (
      <section style={styles.section}>
        <table style={styles.table}>
          <thead style={styles.head}>
            <tr>{tableKeys.map((key, i) => <th style={styles.cell} key={i}>{Cell(key)}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i)=><tr key={i}>
              {tableKeys.map((key, k) => <td style={styles.cell} key={k}>{Cell(row[key])}</td>)}
            </tr>)}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  catalog: catalogShape.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array
};

Table.defaultProps = {

};
export default Specimen(undefined, undefined, {withChildren: false})(Radium(Table));
