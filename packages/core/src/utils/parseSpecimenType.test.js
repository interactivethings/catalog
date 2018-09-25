import parseSpecimenType from "./parseSpecimenType";

test("Default specimen type is `raw-code`", () => {
  expect(parseSpecimenType()).toBe("raw-code");
});

test("String without options", () => {
  expect(parseSpecimenType("html")).toBe("html");
});

test("String before | is specimen type", () => {
  expect(parseSpecimenType("html|no-source")).toBe("html");
});

test("Specimen type is always lower-cased", () => {
  expect(parseSpecimenType("HtmL")).toBe("html");
});
