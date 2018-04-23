import { transform } from "babel-core";
import plugin from "./reactspecimen-source";

const input = `<ReactSpecimen>
  <div>
    foo
  </div>
</ReactSpecimen>`;

const output = `<ReactSpecimen sourceText={"<div>\\n  foo\\n</div>"}>
  <div>
    foo
  </div>
</ReactSpecimen>;`;

test("Adds sourceText prop", () => {
  expect(
    transform(input, { plugins: ["babel-plugin-syntax-jsx", plugin] }).code
  ).toBe(output);
});
