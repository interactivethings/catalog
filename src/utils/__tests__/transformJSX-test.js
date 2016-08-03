import test from 'tape';
import transformJSX from '../transformJSX';

test('Transforms a simple element', (t) => {
  t.equal(
    transformJSX('<div>foo</div>', {}).code,
    `"use strict";
;return React.createElement(
  "div",
  null,
  "foo"
);`
  );
  t.end();
});

test('Transforms a nested element', (t) => {
  t.equal(
    transformJSX('<div><p>foo</p></div>', {}).code,
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
  t.end();
});

test('Transforms a component', (t) => {
  t.equal(
    transformJSX('<Foo bar>baz</Foo>', {Foo: () => null}).code,
    `"use strict";
;return React.createElement(
  Foo,
  { bar: true },
  "baz"
);`
  );
  t.end();
});

test('Transforms a component which is defined inline', (t) => {
  t.equal(
    transformJSX(`const Foo = () => null;
<Foo bar>baz</Foo>`, {}).code,
    `"use strict";

var Foo = function Foo() {
  return null;
};;return React.createElement(
  Foo,
  { bar: true },
  "baz"
);`
  );
  t.end();
});

test('Returns error on syntax error', (t) => {
  t.ok(transformJSX('<div>', {}).error);
  t.end();
});

test('Returns error when import is missing', (t) => {
  t.ok(transformJSX('<Foo />', {}).error);
  t.end();
});

