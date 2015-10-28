import escapeRegExp from '../../../utils/escapeRegExp';
import fileUtils from '../../../utils/fileUtils';

module.exports = (rootPath, files, body) => {
  files.map(file => {
    let regexp = new RegExp("([\"\'])([\.\/a-z0-9]*" + (escapeRegExp(fileUtils.filename(file.source))) + ")([\"\'])", 'gi');
    body = body.replace(regexp, (_, left, path, right) => {
      let targetPath = file.source === fileUtils.normalizePath(rootPath, path) ? file.target : path;
      return left + targetPath + right;
    });
  });
  return body;
}
