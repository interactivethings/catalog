"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@babel/core");
const reactspecimen_source_1 = __importDefault(require("./reactspecimen-source"));
const input = `<ReactSpecimen>
  <div>
    foo
  </div>
</ReactSpecimen>`;
const output = `"use strict";

React.createElement(ReactSpecimen, {
  sourceText: "<div>\\n  foo\\n</div>"
}, React.createElement("div", null, "foo"));`;
test("Adds sourceText prop", () => {
    expect(core_1.transform(input, {
        plugins: ["@babel/plugin-syntax-jsx", reactspecimen_source_1.default],
        filename: "test.js"
    }).code).toBe(output);
});
