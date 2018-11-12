import React from "react";
import { markdown, ReactSpecimen } from "@catalog/core";

export default () => markdown`
# Yo yo

This is a markdown template literal

~~~image
src: "/static/catalog_logo.svg"
title: Neat!
~~~

Super nice stuff here!

Foo bar

${["foo", "bar"].map(d => [
  `### ${d}`,
  <ReactSpecimen key="foo">
    <div>{d}</div>
  </ReactSpecimen>
])}

`;
