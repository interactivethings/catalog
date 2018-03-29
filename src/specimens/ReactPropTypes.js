import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import PropTypes from "prop-types";
import Specimen from "../components/Specimen/Specimen";
import Table from "./Table";
const reactDocs = require("react-docgen");

class ReactPropTypes extends React.Component {
  render() {
    const { catalog, component, columns } = this.props;
    const parsed = reactDocs.parse(catalog.page.imports[component]);
    const rows = Object.keys(parsed.props).map(key => {
      const prop = parsed.props[key];
      return {
        Property: key,
        PropType: prop.type.name,
        Required: prop.required ? "yes" : null,
        Default: prop.defaultValue ? prop.defaultValue.value : null,
        Description: prop.description
      };
    });

    return <Table rows={rows} columns={columns} />;
  }
}

ReactPropTypes.propTypes = {
  catalog: catalogShape.isRequired,
  component: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string)
};

const wrapperStyle = {
  margin: "0",
  "@media (min-width: 640px)": {
    margin: "0"
  }
};

export default Specimen(undefined, undefined, {
  withChildren: false,
  style: wrapperStyle
})(ReactPropTypes);
