import React from "react";
import ReactDOM from "react-dom";
import Catalog from "./components/Catalog";

export default (configuration, element) => {
  ReactDOM.render(<Catalog {...configuration} />, element);
};
