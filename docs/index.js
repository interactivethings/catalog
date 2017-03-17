import {render} from '../lib';

render(
  {
    title: 'Catalog',
    logoSrc: 'docs/assets/catalog_logo.svg',
    theme: {
      // Uses default theme
    },
    pages: [
      {path: '/', title: 'Introduction', src: 'docs/intro.md'},
      {
        path: 'get-started',
        title: 'Get Started',
        src: 'docs/basics/get-started.md'
      },
      {
        path: 'write-documentation',
        title: 'Write Documentation',
        src: 'docs/basics/markdown.md'
      },
      {
        path: 'configuration',
        title: 'Configuration',
        src: 'docs/basics/configuration.md'
      },
      {
        path: 'react-integration',
        title: 'React Integration',
        src: 'docs/react-integration.md'
      },
      // {title: 'Basics', pages: [
      // ]},
      // {title: 'Advanced', pages: [
      //   {path: 'advanced/configuration', title: 'Configuration', src: 'docs/coming-soon.md'},
      //   {path: 'advanced/extending', title: 'Writing Specimens', src: 'docs/coming-soon.md'},
      // ]},
      {
        title: 'Specimens',
        pages: [
          {
            path: 'specimens',
            title: 'Overview',
            src: 'docs/specimens/overview.md'
          },
          {
            path: 'specimens/audio',
            title: 'Audio',
            src: 'docs/specimens/audio.md'
          },
          {
            path: 'specimens/code',
            title: 'Code',
            src: 'docs/specimens/code.md'
          },
          {
            path: 'specimens/color',
            title: 'Color',
            src: 'docs/specimens/color.md'
          },
          {
            path: 'specimens/color-palette',
            title: 'Color Palette',
            src: 'docs/specimens/color-palette.md'
          },
          {
            path: 'specimens/download',
            title: 'Download',
            src: 'docs/specimens/download.md'
          },
          {
            path: 'specimens/hint',
            title: 'Hint',
            src: 'docs/specimens/hint.md'
          },
          {
            path: 'specimens/html',
            title: 'HTML',
            src: 'docs/specimens/html.md',
            styles: ['docs/example-style.css']
          },
          {
            path: 'specimens/image',
            title: 'Image',
            src: 'docs/specimens/image.md'
          },
          {
            path: 'specimens/table',
            title: 'Table',
            src: 'docs/specimens/table.md'
          },
          {
            path: 'specimens/type',
            title: 'Type',
            src: 'docs/specimens/type.md'
          },
          {
            path: 'specimens/video',
            title: 'Video',
            src: 'docs/specimens/video.md'
          },
          {
            path: 'specimens/react',
            title: 'React',
            src: 'docs/specimens/react.md'
          }
        ]
      },
      {
        path: 'test',
        title: 'Style Test',
        src: 'docs/test/test.md',
        styles: ['docs/test/test.css'],
        scripts: ['docs/test/test.js'],
        hideFromMenu: true
      }
    ]
  },
  document.getElementById('catalog')
);
