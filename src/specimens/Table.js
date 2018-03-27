import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import PropTypes from "prop-types";
import Radium from "radium";
import Specimen from "../components/Specimen/Specimen";
import { text } from "../styles/typography";
import renderMarkdown from "../markdown/renderMarkdown";

function getStyle(theme) {
  return {
    container: {
      flexBasis: "100%",
      overflow: "auto",
      paddingBottom: "10px"
    },
    table: {
      ...text(theme),
      borderCollapse: "collapse",
      lineHeight: "auto",
      width: "100%",
      borderBottom: `none`
    },
    tableRow: {
      borderBottom: `1px solid ${theme.sidebarColorLine}`
    },
    head: {
      fontWeigth: "bold",
      borderBottom: `2px solid ${theme.lightColor}`
    },
    cell: {
      padding: "0 1em 0 0",
      textAlign: "left",
      verticalAlign: "top"
    },
    cellLast: {
      padding: "0px",
      textAlign: "left",
      verticalAlign: "top"
    }
  };
}

const Cell = ({ value, style, heading }) => {
  let content;
  if (typeof value === "string") {
    content = renderMarkdown({ text: value.toString() });
  } else if (value === void 0) {
    content = <p style={{ opacity: 0.2 }}>—</p>;
  } else {
    content = <p>{value}</p>;
  }

  return heading ? (
    <th style={style}>{content}</th>
  ) : (
    <td style={style}>{content}</td>
  );
};

Cell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object.isRequired,
  heading: PropTypes.bool
};

class Table extends React.Component {
  render() {
    const { columns, rows, catalog: { theme } } = this.props;
    const { cell, cellLast, container, table, head, tableRow } = getStyle(
      theme
    );
    const cellStyle = (totalCells, cellIndex) =>
      cellIndex === totalCells - 1 ? cellLast : cell;
    const tableKeys = columns
      ? columns
      : rows
          .reduce((index, row) => index.concat(Object.keys(row)), [])
          .filter((value, i, self) => self.indexOf(value) === i);
    return (
      <section style={container}>
        <table style={table}>
          <thead style={head}>
            <tr>
              {tableKeys.map((key, k) => (
                <Cell
                  heading
                  value={key}
                  key={k}
                  style={cellStyle(tableKeys.length, k)}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr style={tableRow} key={i}>
                {tableKeys.map((key, k) => (
                  <Cell
                    value={row[key]}
                    key={k}
                    style={cellStyle(tableKeys.length, k)}
                  />
                ))}
              </tr>
            ))}
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

Table.defaultProps = {};
export default Specimen(undefined, undefined, { withChildren: false })(
  Radium(Table)
);
