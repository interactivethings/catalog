import renderMarkdown from "./renderMarkdown";

const md = `
# Hello

World

- One
  - Two
- Three

A [link](http://www.interactivethings.com/) and some **bold** and *italic* text. Blank links foo@bar.com https://foobar.com

~~~
a code block
~~~

Inline \`code\`

> Block quotes rock _another em style_
`;

test("Renders some Markdown", () => {
  expect(
    renderMarkdown({
      text: md
    })
  ).toMatchSnapshot();
});

test("Renders some Markdown with custom renderers", () => {
  expect(
    renderMarkdown({
      text: md,
      renderer: {
        paragraph() {
          return "HELLO PARAGRAPH";
        },
        listitem() {
          return "HELLO LIST ITEM";
        }
      }
    })
  ).toMatchSnapshot();
});
