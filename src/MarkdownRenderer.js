import _ from 'lodash';
import marked from '../lib/react-markdown';

let MARKDOWN_CONFIG = {
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
};

let splitIntoSections = (sections, node) => {
  if (node.type === 'h2') {
    sections.push([node]);
  } else {
    _.last(sections).push(node);
  }
  return sections;
};

let wrapSection = (sectionComponent) =>{
  return (nodes, i) => {
    if (i === 0) {
      return nodes;
    }
    return sectionComponent(nodes);
  };
};

module.exports = (options) => {
  let renderer = new marked.Renderer();
  let ref = options.renderer || {};
  for (let type in ref) {
    if ({}.hasOwnProperty.call(ref, type)) {
      let handler = ref[type];
      renderer[type] = handler;
    }
  }
  let markedOptions = _.extend({
    renderer: renderer
  }, MARKDOWN_CONFIG);
  return marked(options.text, markedOptions).reduce(splitIntoSections, [[]]).map(wrapSection(options.section));
};
