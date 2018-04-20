import React from "react";
import { markdown, ReactSpecimen } from "catalog";
import logo from "../catalog_logo.svg";

export default () => markdown`
# Yo yo

This is a markdown template literal

~~~image
src: ${logo}
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
