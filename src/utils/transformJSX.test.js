import transformJSX from "./transformJSX";

test("Transforms a simple element", () => {
  expect(transformJSX("<div>foo</div>", {}).code).toMatchSnapshot();
});

test("Transforms a nested element", () => {
  expect(transformJSX("<div><p>foo</p></div>", {}).code).toMatchSnapshot();
});

test("Transforms a component", () => {
  expect(
    transformJSX("<Foo bar>baz</Foo>", { Foo: () => null }).code
  ).toMatchSnapshot();
});

test("Transforms a component which is defined inline", () => {
  expect(
    transformJSX(
      `const Foo = () => null;
<Foo bar>baz</Foo>`,
      {}
    ).code
  ).toMatchSnapshot();
});

test("Transforms an array of elements", () => {
  expect(
    transformJSX(
      `[
    <div key={1}>hey</div>,
    <div key={2}>ho</div>
  ]`,
      {}
    ).code
  ).toMatchSnapshot();
});

test("Returns the last expression", () => {
  expect(
    transformJSX(
      `
    React.createElement('div', {}, 'hey');
    React.createElement('div', {}, 'ho');
  `,
      {}
    ).code
  ).toMatchSnapshot();
});

test("Returns any expression", () => {
  expect(
    transformJSX(
      `
    const h = React.createElement;
    h('div', {}, 'hey');
  `,
      {}
    ).code
  ).toMatchSnapshot();
});

test("Returns error on syntax error", () => {
  expect(transformJSX("<div>", {}).error).toBeDefined();
});

test("Returns error when import is missing", () => {
  expect(transformJSX("<Foo />", {}).error).toBeDefined();
});
