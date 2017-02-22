import marked from './react-markdown';

let MARKDOWN_CONFIG = {
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: true
};

export default ({text, renderer}) => {
  return marked(
    text,
    {
      ...MARKDOWN_CONFIG,
      renderer: Object.assign(new marked.Renderer(), renderer)
    }
  );
};
