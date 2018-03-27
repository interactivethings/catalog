import { parseSpecimenBody, parseSpecimenYamlBody } from "./parseSpecimenBody";

test("Default String body", () => {
  expect(parseSpecimenBody()("foo")).toEqual({ children: "foo" });
});

test("Default JSON body", () => {
  expect(
    parseSpecimenYamlBody()(
      '{"foo": "bar", "baz": 12.3, "nothing": null, "really": true}'
    )
  ).toEqual({ foo: "bar", baz: 12.3, nothing: null, really: true });
});

test("Default YAML body", () => {
  expect(
    parseSpecimenYamlBody()("foo: bar\nbaz: 12.3\nnothing: null\nreally: true")
  ).toEqual({ foo: "bar", baz: 12.3, nothing: null, really: true });
});

test("Mapped raw YAML body", () => {
  expect(
    parseSpecimenYamlBody((_, raw) => raw)(
      "foo: bar\nbaz: 12.3\nnothing: null\nreally: true"
    )
  ).toBe("foo: bar\nbaz: 12.3\nnothing: null\nreally: true");
});

test("Mapped YAML body", () => {
  expect(
    parseSpecimenYamlBody(props => props.foo)(
      "foo: bar\nbaz: 12.3\nnothing: null\nreally: true"
    )
  ).toBe("bar");
});

test("YAML body with imports", () => {
  expect(parseSpecimenYamlBody()("foo: !import bar", { bar: "bar" })).toEqual({
    foo: "bar"
  });
});

test("body with props and children", () => {
  expect(parseSpecimenBody()("foo: bar\nbaz: 12.3\n---\nfoo")).toEqual({
    foo: "bar",
    baz: 12.3,
    children: "foo"
  });
});

test("body with props and children and whitespaced separator", () => {
  expect(parseSpecimenBody()("foo: bar\nbaz: 12.3\n  ---\nfoo")).toEqual({
    foo: "bar",
    baz: 12.3,
    children: "foo"
  });
});

test("body with props and children and whitespaced separator using tabs", () => {
  expect(parseSpecimenBody()("foo: bar\nbaz: 12.3\n\t\t---\nfoo")).toEqual({
    foo: "bar",
    baz: 12.3,
    children: "foo"
  });
});

test("body with props and empty children", () => {
  expect(parseSpecimenBody()("foo: bar\nbaz: 12.3\n---\n")).toEqual({
    foo: "bar",
    baz: 12.3,
    children: ""
  });
});

test("body with props and empty children and whitespaced separator", () => {
  expect(parseSpecimenBody()("foo: bar\nbaz: 12.3\n  ---\n")).toEqual({
    foo: "bar",
    baz: 12.3,
    children: ""
  });
});

test("body with separator but only children", () => {
  expect(parseSpecimenBody()("---\nfoo")).toEqual({ children: "foo" });
});

test("body with whitespaced separator but only children", () => {
  expect(parseSpecimenBody()("  ---\nfoo")).toEqual({ children: "foo" });
});

test("body with separator and empty props", () => {
  expect(parseSpecimenBody()("\n\n---\nfoo")).toEqual({ children: "foo" });
});

test("body with whitespaced separator and empty props", () => {
  expect(parseSpecimenBody()("\n\n  ---\nfoo")).toEqual({ children: "foo" });
});

test("body with separator and invalid props", () => {
  expect(parseSpecimenBody()("foo\n---\nbar")).toEqual({ children: "bar" });
});

test("body with whitespaced separator and invalid props", () => {
  expect(parseSpecimenBody()("foo\n  ---\nbar")).toEqual({ children: "bar" });
});

test("body with multiple separators", () => {
  expect(parseSpecimenBody()("foo: true\n---\nbar\n---\nbaz")).toEqual({
    foo: true,
    children: "bar\n---\nbaz"
  });
});

test("body with multiple whitespaced separators", () => {
  expect(parseSpecimenBody()("foo: true\n  ---\nbar\n  ---\nbaz")).toEqual({
    foo: true,
    children: "bar\n  ---\nbaz"
  });
});

test("body with trailing separator", () => {
  expect(parseSpecimenBody()("foo---\nbar")).toEqual({
    children: "foo---\nbar"
  });
});

test("body with whitespaced trailing separator", () => {
  expect(parseSpecimenBody()("foo  ---\nbar")).toEqual({
    children: "foo  ---\nbar"
  });
});

test("body with children but valid yaml", () => {
  expect(parseSpecimenBody()("foo: true")).toEqual({ children: "foo: true" });
});

test("body with imports in props", () => {
  expect(
    parseSpecimenBody()("foo: !import bar\n---\nbaz", { bar: "bar" })
  ).toEqual({ foo: "bar", children: "baz" });
});

test("body with imports in props and whitespaced separator", () => {
  expect(
    parseSpecimenBody()("foo: !import bar\n  ---\nbaz", { bar: "bar" })
  ).toEqual({ foo: "bar", children: "baz" });
});
