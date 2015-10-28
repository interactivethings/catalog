import _ from 'lodash';
import marked from '../lib/react-markdown';

let MARKDOWN_CONFIG = {
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
};

module.exports = (options) => {
  var handler, markedOptions, ref, renderer, type;
  renderer = new marked.Renderer();
  ref = options.renderer || {};
  for (type in ref) {
    handler = ref[type];
    renderer[type] = handler;
  }
  markedOptions = _.extend({
    renderer: renderer
  }, MARKDOWN_CONFIG);
  return marked(options.text, markedOptions).reduce(splitIntoSections, [[]]).map(wrapSection(options.section));
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
    } else {
      return sectionComponent(nodes);
    }
  };
};
