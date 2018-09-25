import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Catalog,
  markdown,
  ReactSpecimen,
  Config,
  Page,
  pageLoader,
  HtmlSpecimen,
  TableSpecimen,
  ColorSpecimen,
  ColorPaletteSpecimen,
  CodeSpecimen
} from "catalog";

const MyPage = () => markdown`

# Hello

${(
  <ReactSpecimen span={2} dark sourceText="foo">
    <div>Hello</div>
  </ReactSpecimen>
)}

${(
  <ReactSpecimen span={2} dark sourceText="foo">
    <div>Hello</div>
    <div>World</div>
  </ReactSpecimen>
)}

${(
  <TableSpecimen
    span={3}
    rows={[{ foo: 1, bar: "bar", blah: <p>foo</p> }]}
    columns={["bar", "foo"]}
  />
)}

${<ColorSpecimen name="red" value="#660000" />}

${<ColorSpecimen value="#660000" />}

${(
  <ColorPaletteSpecimen
    colors={[
      { name: "red", value: "#660000" },
      { name: 100, value: "#ff0000" }
    ]}
  />
)}

${<ColorPaletteSpecimen colors={[{ value: "#660000" }]} />}

${<HtmlSpecimen light>{"hello"}</HtmlSpecimen>}

${<CodeSpecimen>{"hello"}</CodeSpecimen>}

${(
  <CodeSpecimen span={3} lang="javascript">
    {"var x = 3;"}
  </CodeSpecimen>
)}

`;

ReactDOM.render(<Catalog title="Hello" pages={[]} />, document.body);

const config: Config = {
  title: "Test",
  theme: {
    background: "white"
  },
  pages: [
    {
      path: "/",
      title: "Introduction",
      styles: ["foo.css"],
      content: () => <Page>hello</Page>
    },
    {
      path: "/wat",
      title: "Wat",
      content: () => <p>I can also be any Element</p>
    },
    {
      path: "/foo",
      title: "Foo",
      content: MyPage
    },
    {
      path: "/bar",
      title: "Bar",
      content: pageLoader("./bar.md")
    },
    {
      title: "Materials",
      pages: [
        {
          path: "/materials/typeface",
          title: "Typeface",
          content: pageLoader(() => import("./test-page"))
        },
        {
          path: "/materials/typeface2",
          title: "Typeface2",
          content: pageLoader(() => import("./test-page-2"))
        }
      ]
    }
  ],
  useBrowserHistory: true,
  basePath: "/doc",
  responsiveSizes: [
    { name: "large", width: 978, height: 1100 },
    { name: "medium", width: 640, height: 900 },
    { name: "small", width: 471, height: 700 }
  ]
};

ReactDOM.render(<Catalog title="Hello" pages={[]} />, document.body);

ReactDOM.render(<Catalog {...config} />, document.body);
