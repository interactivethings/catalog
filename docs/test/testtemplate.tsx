import React from "react";
import { markdown, ReactSpecimen } from "@catalog/core";
import logo from "../catalog_logo.svg";

import styles from "./foo.module.css";
import styles2 from "./foo.module.scss";

export default () => markdown`
# Yo yo

This is a markdown template literal

~~~image
src: ${logo}
title: Neat!
~~~

~~~image
src: "/assets/image.jpg"
title: Neat!
~~~

Super nice stuff here!

Foo bar

${["foo", "bar"].map(d => [
  `### ${d}`,
  <ReactSpecimen key="foo">
    <div className={`${styles.red} ${styles2.white}`}>{d}</div>
  </ReactSpecimen>
])}

`;
