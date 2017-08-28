import React from "react";
import ReactDOM from "react-dom";
import { Catalog, ContentLoader } from "catalog";

const pages = [
  {
    path: "/",
    title: "Welcome",
    content: ContentLoader(() => import("./WELCOME.md"))
  }
];

ReactDOM.render(
  <Catalog title="Catalog" pages={pages} />,
  document.getElementById("catalog")
);
