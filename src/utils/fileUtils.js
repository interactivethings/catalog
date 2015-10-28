
let slice = [].slice;

let dirname = (path) => {
  var _, _dirname, i, ref;
  ref = path.split('/'), _dirname = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), _ = ref[i++];
  if (_dirname[0] === '') {
    _dirname.shift('');
  }
  return _dirname.join('/');
};

let filename = (path) => {
  var _, _filename, i, ref;
  ref = path.split('/'), _ = 2 <= ref.length ? slice.call(ref, 0, i = ref.length - 1) : (i = 0, []), _filename = ref[i++];
  return _filename;
};

// root = a/b
// path -> a/b/path
// ./path -> a/b/path
// ../path -> a/path
// ../../path -> path
// ../../../path -> ../a/b/path
// b/path -> a/b/path
// /path -> /path

let normalizePath = (root, path) => {
  var fragment, fragments, i, len, result, rootFragments;
  if (path.match(/^\//)) {
    return path;
  }
  rootFragments = root.split('/').reverse();
  fragments = path.split('/').reverse();
  result = [];
  for (i = 0, len = fragments.length; i < len; i++) {
    fragment = fragments[i];
    switch (fragment) {
      case '.':
        result = result.concat(rootFragments);
        rootFragments = [];
        break;
      case '..':
        if (rootFragments.length > 0) {
          rootFragments.shift();
        } else {
          result.push(fragment);
        }
        break;
      default:
        if (fragment === rootFragments[0]) {
          rootFragments.shift();
        }
        result.push(fragment);
    }
  }
  return result.concat(rootFragments).reverse().join('/');
};

module.exports = {
  dirname: dirname,
  filename: filename,
  normalizePath: normalizePath
};
