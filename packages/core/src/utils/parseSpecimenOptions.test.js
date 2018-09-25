import parseSpecimenOptions from "./parseSpecimenOptions";
import mapSpecimenOption from "./mapSpecimenOption";

test("Default specimen options", () => {
  expect(parseSpecimenOptions()()).toEqual({});
});

test("Boolean specimen options", () => {
  expect(parseSpecimenOptions()("html|foo")).toEqual({ foo: true });
  expect(parseSpecimenOptions()("html|foo,bar")).toEqual({
    foo: true,
    bar: true
  });
});

test("Specimen options are camelized", () => {
  expect(parseSpecimenOptions()("html|foo-bar")).toEqual({ fooBar: true });
});

test("Specimen span option is mapped by default", () => {
  expect(parseSpecimenOptions()("html|span-1")).toEqual({ span: 1 });
});

test("Mapped specimen option", () => {
  expect(
    parseSpecimenOptions(mapSpecimenOption(/^foo-(\d)$/, v => ({ foo: +v })))(
      "html|foo-1"
    )
  ).toEqual({ foo: 1 });
});

test("Custom specimen option mapper", () => {
  expect(
    parseSpecimenOptions(option => ({
      [option.split("-")[0]]: +option.split("-")[1]
    }))("html|foo-1,bar-3")
  ).toEqual({ foo: 1, bar: 3 });
});

test("Mixed specimen options", () => {
  expect(
    parseSpecimenOptions(mapSpecimenOption(/^lang-(\w+)$/, lang => ({ lang })))(
      "code|lang-javascript,collapsed,"
    )
  ).toEqual({ lang: "javascript", collapsed: true });
});
