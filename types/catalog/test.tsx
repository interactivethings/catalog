import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Catalog,
  markdown,
  ReactSpecimen,
  Config,
  Page,
  pageLoader,
  HtmlSpecimen
} from "catalog";

const MyPage = () => markdown`

# Hello

${(
  <ReactSpecimen span={2} dark sourceText="foo">
    <div>Hello</div>
  </ReactSpecimen>
)}

${(
  <HtmlSpecimen light>
    {'hello'}
  </HtmlSpecimen>
)}

`;

ReactDOM.render(<Catalog title="Hello" pages={[]} />, document.body);


const config: Config = {
  title: "Test",
  theme: {
    background: 'white'
  },
  pages: [
    {
      path: "/",
      title: "Introduction",
      styles: ['foo.css'],
      content: () => <Page>hello</Page>,
    },
    {
      path: "/foo",
      title: "Foo",
      content: MyPage
    },
    {
      path: "/bar",
      title: "Bar",
      content: pageLoader('./bar.md')
    },
    {
      title: "Materials",
      pages: [
        {
          path: "/materials/typeface",
          title: "Typeface",
          content: pageLoader(() => import('./test-page'))
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