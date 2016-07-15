import React, {PropTypes} from 'react';
import {catalogShape} from '../CatalogPropTypes';
import Radium from 'radium';
import Specimen from '../components/Specimen/Specimen';
import {text} from '../styles/typography';
import renderMarkdown from '../utils/renderMarkdown';

function getStyle(theme) {
  return {
    container: {
      flexBasis: '100%',
      overflow: 'scroll',
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
      color: theme.sidebarColorHeading,
      fontWeigth: 'bold',
      borderBottom: `2px solid ${theme.lightColor}`
    },
    cell: {
      padding: '0 1em 0 0',
      textAlign: 'left',
      verticalAlign: 'top'
    },
    cellLast: {
      padding: '0',
      textAlign: 'left',
      verticalAlign: 'top'
    }
  };
}

const Cell = (value, id, style, heading) => {
  const content = typeof value === 'string'
    ? renderMarkdown({text: value})
    : value || <p style={{opacity: 0.2}}>—</p>;
  return heading
    ? <th key={id} style={style}>{content}</th>
    : <td key={id} style={style}>{content}</td>;
};

class Table extends React.Component {
  render() {
    const {columns, rows, catalog: {theme}} = this.props;
    const {cell, cellLast, container, table, head, tableRow} = getStyle(theme);
    const cellStyle = (totalCells, cellIndex) => cellIndex === totalCells - 1 ? cellLast : cell;
    const tableKeys = columns ? columns : rows.reduce( (index, row) => index
      .concat(Object.keys(row)), [])
      .filter((value, i, self) => self.indexOf(value) === i);
    return (
      <section style={container}>
        <table style={table}>
          <thead style={head}>
            <tr>{tableKeys.map((key, k) => Cell(key, k, cellStyle(tableKeys.length, k), true))}</tr>
          </thead>
          <tbody>
            {rows.map((row, i)=><tr style={tableRow}  key={i}>
              {tableKeys.map((key, k) => Cell(row[key], k, cellStyle(tableKeys.length, k), false))}
            </tr>)}
          </tbody>
        </table>
      </section>
    );
  }
}

Table.propTypes = {
  catalog: catalogShape.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string)
};

Table.defaultProps = {

};
export default Specimen(undefined, undefined, {withChildren: false})(Radium(Table));
