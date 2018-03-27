import React from "react";
import reactElementToString from "./reactElementToString";

test("Children", () => {
  expect(reactElementToString(<div>foo</div>)).toBe("<div>\n  foo\n</div>");
});

test("Nested Children", () => {
  expect(
    reactElementToString(
      <div>
        <div>foo</div>
      </div>
    )
  ).toBe("<div>\n  <div>\n    foo\n  </div>\n</div>");
});

test("No Children", () => {
  expect(reactElementToString(<div />)).toBe("<div />");
});

test("Prop formatting", () => {
  expect(reactElementToString(<div foo="bar" />)).toBe("<div foo='bar' />");
  expect(reactElementToString(<div foo />)).toBe("<div foo />");
  expect(reactElementToString(<div foo bar={1} />)).toBe(
    "<div\n  bar={1}\n  foo\n />"
  );
  expect(reactElementToString(<div foo bar={undefined} />)).toBe("<div foo />");
  expect(reactElementToString(<div foo bar={null} />)).toBe(
    "<div\n  bar={null}\n  foo\n />"
  );
});

test("Skip stringification on error", () => {
  let foo = {};
  foo.foo = foo;
  expect(reactElementToString(<div foo={foo} />)).toEqual(
    expect.stringContaining(`Couldn't stringify React Element`)
  );
});
