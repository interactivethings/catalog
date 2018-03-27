import validateSizes from "./validateSizes";
import DefaultResponsiveSizes from "./../DefaultResponsiveSizes";

test("Value is string that is not contained in the list", () => {
  expect(validateSizes("Palm Pre", DefaultResponsiveSizes)).toBeFalsy();
});

test("Value is boolean true, should return DefaultResponsiveSizes Array", () => {
  expect(validateSizes(true, DefaultResponsiveSizes)).toEqual(
    DefaultResponsiveSizes
  );
});

test("Value is Array, consisting of defined sizes", () => {
  const values = ["small", "medium", "large", "xlarge"];
  expect(DefaultResponsiveSizes).toEqual(
    validateSizes(values, DefaultResponsiveSizes)
  );
});

test("Value is Array, allow re-ordering defined sizes", () => {
  const sizes = [
    { name: "small", width: 360, height: 640 },
    { name: "xlarge", width: 1920, height: 1080 }
  ];
  const values = ["xlarge", "small"];
  expect(validateSizes(values, sizes)).toEqual([sizes[1], sizes[0]]);
});

test("Value is Array, not containing at least one of the defined sizes", () => {
  const values = ["camera obscura", "That weird giant sony rear projection TV"];
  expect(validateSizes(values, DefaultResponsiveSizes)).toBeFalsy();
});
