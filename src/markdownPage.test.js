import React from "react";
import markdownPage from "./markdownPage";
import Hint from "./specimens/Hint";

test("Catalog markdown page template literal", () => {
  const page = markdownPage`
# This is a title

A paragraph

${(
    <Hint>
      {`# THIS IS A HINT

Cool, eh?`}
    </Hint>
  )}
`;
  expect(page).toMatchSnapshot();
});

test("Catalog markdown page template literal with arbitrary values", () => {
  const page = markdownPage`
# This is a title

A paragraph ${123}

~~~
${["foo", "bar", <div key="hello">hello</div>]}
~~~
`;
  expect(page).toMatchSnapshot();
});
