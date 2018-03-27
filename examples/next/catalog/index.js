import React from "react";
import ReactDOM from "react-dom";
import { Catalog } from "catalog";

const pages = [
  { path: "/", title: "Welcome", component: require("./WELCOME.md") }
];

ReactDOM.render(
  <Catalog title="Catalog" pages={pages} />,
  document.getElementById("catalog")
);
