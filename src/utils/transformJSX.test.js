import transformJSX from './transformJSX';

test('Transforms a simple element', () => {
  expect(transformJSX('<div>foo</div>', {}).code).toBe(
    `"use strict";
;return React.createElement(
  "div",
  null,
  "foo"
);`
  );
});

test('Transforms a nested element', () => {
  expect(transformJSX('<div><p>foo</p></div>', {}).code).toBe(
    `"use strict";
;return React.createElement(
  "div",
  null,
  React.createElement(
    "p",
    null,
    "foo"
  )
);`
  );
});

test('Transforms a component', () => {
  expect(transformJSX('<Foo bar>baz</Foo>', {Foo: () => null}).code).toBe(
    `"use strict";
;return React.createElement(
  Foo,
  { bar: true },
  "baz"
);`
  );
});

test('Transforms a component which is defined inline', () => {
  expect(transformJSX(`const Foo = () => null;
<Foo bar>baz</Foo>`, {}).code).toBe(
    `"use strict";

var Foo = function Foo() {
  return null;
};;return React.createElement(
  Foo,
  { bar: true },
  "baz"
);`
  );
});

test('Returns error on syntax error', () => {
  expect(transformJSX('<div>', {}).error).toBeDefined();
});

test('Returns error when import is missing', () => {
  expect(transformJSX('<Foo />', {}).error).toBeDefined();
});
