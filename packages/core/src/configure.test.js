import configure from "./configure";

test("Configuration with default theme and specimens", () => {
  expect(
    configure({
      title: "Catalog",
      pages: [
        {
          path: "/",
          title: "Overview",
          src: "overview.md"
        }
      ]
    })
  ).toMatchSnapshot();
});

test("Configuration with nested pages", () => {
  expect(
    configure({
      title: "Catalog",
      pages: [
        {
          title: "Overview",
          pages: [
            {
              path: "foo",
              title: "Foo",
              src: "foo.md"
            },
            {
              path: "bar",
              title: "Bar",
              src: "bar.md"
            }
          ]
        }
      ]
    })
  ).toMatchSnapshot();
});

test("Configuration with component", () => {
  expect(
    configure({
      title: "Catalog",
      pages: [
        {
          path: "/",
          title: "Overview",
          component: () => null
        }
      ]
    })
  ).toMatchSnapshot();
});

test("`content` is aliased to `component`", () => {
  const Content = () => null;
  const config = configure({
    title: "Catalog",
    pages: [
      {
        path: "/",
        title: "Overview",
        content: Content
      }
    ]
  });

  expect(config.pages[0].component).toBe(Content);
});

test("Imports are merged on pages", () => {
  const config = configure({
    title: "Catalog",
    imports: { Foo: "Foo" },
    pages: [
      {
        path: "/",
        title: "Overview",
        imports: { Bar: "Bar" },
        src: "overview.md"
      }
    ]
  });

  expect(config.pages[0].imports).toEqual({ Foo: "Foo", Bar: "Bar" });
});

test("basePath support", () => {
  const config = configure({
    title: "Catalog",
    basePath: "catalog",
    pages: [
      {
        path: "/",
        title: "Overview",
        src: "overview.md"
      }
    ]
  });

  expect(config.basePath).toBe("/catalog");
  expect(config.pages[0].path).toBe("/catalog");
  // Fallback page
  expect(config.pages[1].path).toBe("/catalog/*");
});

test("publicUrl support with hash history", () => {
  const config = configure({
    title: "Catalog",
    publicUrl: "https://foo.bar/baz/",
    pages: [
      {
        path: "/",
        title: "Overview",
        src: "overview.md"
      }
    ]
  });

  expect(config.basePath).toBe("/");
  expect(config.publicUrl).toBe("https://foo.bar/baz"); // no trailing slash
  expect(config.pages[0].path).toBe("/"); // It's hash history!
  // Fallback page
  expect(config.pages[1].path).toBe("/*");
});

test("publicUrl support with browser history", () => {
  const config = configure({
    title: "Catalog",
    useBrowserHistory: true,
    publicUrl: "https://foo.bar/baz/",
    pages: [
      {
        path: "/",
        title: "Overview",
        src: "overview.md"
      }
    ]
  });

  expect(config.basePath).toBe("/baz");
  expect(config.publicUrl).toBe("https://foo.bar/baz"); // no trailing slash
  expect(config.pages[0].path).toBe("/baz");
  // Fallback page
  expect(config.pages[1].path).toBe("/baz/*");
});
