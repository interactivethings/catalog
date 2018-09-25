import marked from "./marked-react";
import ReactRenderer from "./ReactRenderer";

let MARKDOWN_CONFIG = {
  gfm: true,
  breaks: true,
  sanitize: false,
  smartLists: true,
  smartypants: true
};

export default ({ text, renderer }) => {
  return marked(text, {
    ...MARKDOWN_CONFIG,
    renderer: Object.assign(new ReactRenderer(), renderer)
  });
};
