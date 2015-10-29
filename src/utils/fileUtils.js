let dirname = (path) => {
  let ref = path.split('/');

  // if URL did start with /, discard the now empty string
  if ( ref[0].length === 0 ) {
    ref.shift();
    ref.pop();
    return ref.join('/');
  }
  ref.pop();
  return ref.join('/');
};

let filename = (path) => {
  // separate by /
  let ref = path.split('/');
  // get last element of array
  let name = ref.slice(-1)[0];
  return name;
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
  if (path.match(/^\//)) {
    return path;
  }
  let rootFragments = root.split('/').reverse();
  let fragments = path.split('/').reverse();
  let result = [];
  for (let i = 0, len = fragments.length; i < len; i++) {
    let fragment = fragments[i];
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
