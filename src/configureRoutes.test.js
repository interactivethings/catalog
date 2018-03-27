import configure from "./configure";
import configureRoutes from "./configureRoutes";

test("Pre-Configuration", () => {
  const routes = configureRoutes(
    configure({
      title: "Catalog",
      pages: [
        {
          path: "/",
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
  );

  expect(routes.childRoutes.length).toBe(3);
  expect(routes.childRoutes[0].path).toBe("/foo");
});

test("Auto-Configuration", () => {
  const routes = configureRoutes({
    title: "Catalog",
    pages: [
      {
        path: "/",
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
  });

  expect(routes.childRoutes.length).toBe(3);
  expect(routes.childRoutes[0].path).toBe("/foo");
});
