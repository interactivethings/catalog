import R from 'ramda';

const INDEX = 'index.html';

const DEFAULTS = {
  name: 'project',
  files: {},
  scrolling: 'no',
  size: {
    height: 500,
    width: '100%',
  }
}

function parseSize(size) {
  let {width, height} = size;
  if (typeof height === 'number') {
    height = height + "px";
  }
  if (typeof width === 'number') {
    width = width + "px";
  }
  return { width: width, height: height };
};

module.exports = (body) => {
  let config = R.merge(DEFAULTS, JSON.parse(body));

  let index = null;

  if (config['index'] != null) {
    console.warn('Deprecated: use "index.html" instead of "index"');
    index = config['index'];
    delete config['index'];
  }
  if (config[INDEX] != null) {
    if (index != null) {
      console.warn('Index document was already defined and will be overwritten');
    }
    index = config[INDEX];
    delete config[INDEX];
  }
  if (config.files[INDEX] != null) {
    if (index != null) {
      console.warn('Index document was already defined and will be overwritten');
    }
    index = config.files[INDEX];
  }
  if (index == null) {
    throw new Error('"index.html" must be defined');
  }
  config = R.assocPath(['files', INDEX], index, config);
  let files = [];
  let ref = config.files;
  for (let target in ref) {
    let source = ref[target];
    let file = typeof source === 'string' ? {
      source: source
   } : source;
   if (file.target == null) {
      file.target = target;
   }
   if (file.template == null) {
      file.template = null;
   }
   if (file.target === INDEX) {
      config.index = file;
   }
   files.push(file);
  }
  config.files = files;
  config.size = parseSize(config.size);
  return config;
}
