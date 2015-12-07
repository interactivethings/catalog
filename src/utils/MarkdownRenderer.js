import marked from './react-markdown';

let MARKDOWN_CONFIG = {
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
};

module.exports = ({text, renderer}) => {
  return marked(
    text, 
    {
      ...MARKDOWN_CONFIG,
      renderer: Object.assign(new marked.Renderer(), renderer)
    }
  );
};
