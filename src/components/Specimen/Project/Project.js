import React, { PropTypes } from 'react';
import R from 'ramda';
import JSZip from 'jszip';
import Radium from 'radium';
// Polyfill for DOMParser.parseFromString support
import 'utils/DOMParser';

import fileUtils from 'utils/fileUtils';
import saveAs from 'utils/FileSaver';
import {text, link} from 'scaffold/typography';

import normalizeReferences from './normalizeReferences';
import TabbedSourceView from './TabbedSourceView';

function getStyle(theme) {
  return {
    container: {
      marginTop: '15px',
      marginBottom: '30px',
      overflow: 'auto',
      flexBasis: '100%'
    },
    frame: {
      border: '1px solid #eee',
      display: 'block'
    },
    link: {
      ...text(theme, {level: 2}),
      ...link(theme),
      display: 'inline-block',
      float: 'left',
      margin: '0.6em 1.333em 0 0'
    }
  };
}

const imagePathRe = /\.(jpe?g|gif|png)$/;
const isImage = (path) => imagePathRe.test(path);

class Project extends React.Component {
  render() {
    let {index, scrolling, files, size, theme} = this.props;
    let styles = getStyle(theme);

    return (
      <div className='cg-Specimen-Project' style={styles.container}>
        <iframe
          src={index.source}
          scrolling={scrolling}
          marginHeight='0'
          marginWidth='0'
          style={[styles.frame, size]}
        />
      <a key={'new-window'} style={styles.link} href={index.source} target='_blank'>Open in new window</a>
      <a key={'download'} style={styles.link} href='#' onClick={this.download.bind(this, this.props)}>Download</a>
      <TabbedSourceView
        rootPath={fileUtils.dirname(index.source)}
        files={files}
        theme={theme}
        sourceFiles={this.sourceViewFiles(this.props)}
      />
      </div>
    );
  }

  sourceViewFiles(props) {
    return props.files.filter((d) => {
      return R.contains(d.target, R.or(props.sourceView, []));
    });
  }

  filterMatching(list, prop) {
    (d) => R.contains(d[prop], list);
  }

  parseExposedFiles(source) {
    let doc = new DOMParser().parseFromString(source, 'text/html');
    let files = [];
    let ref = doc.querySelectorAll('[data-catalog-project-expose]');
    for (let i = 0, len = ref.length; i < len; i++) {
      let node = ref[i];
      let path = node.getAttribute('data-catalog-project-expose');
      node.removeAttribute('data-catalog-project-expose');
      files.push({
        path: path,
        content: node.innerHTML
      });
    }

    return files;
  }

  download(props, evt) {
    evt.preventDefault();

    let zip = new JSZip();
    let root = zip.folder(props.name);
    let rootPath = fileUtils.dirname(props.index.source);
    let virtualFiles = [];

    // It worked! The monkeys banged away on the keyboard and something functioning
    // came out of it! Such mess, but such works. Wow.

    let files = props.files.map((file) => {
      return new Promise((resolve, reject) => {
        // When dealing with an image, we need to make sure to load it as binary
        // data, not plain text. We do this by issuing a custom request with a
        // response type of 'arraybuffer'.
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Sending_and_Receiving_Binary_Data
        //
        // This does not work in older browsers, if a need arises to support them,
        // we can use the jBinary library instead.
        // https://github.com/jDataView/jBinary/wiki
        //
        // Also, note that our 'image' detection is extremely primitive and won't
        // support all images, let alone other binary data.

        if (isImage(file.source)) {
          let req = new XMLHttpRequest();
          req.open('GET', file.source, true);
          req.responseType = 'arraybuffer';
          req.onload = () => {
            return resolve({
              path: file.target,
              content: req.response
            });
          };
          req.onerror = reject;
          return req.send(null);
        }
        // In all other cases, we want to load the file as plain text and process
        // it further before adding it to the zip file.

        return fetch(file.source, {
          headers: {
            Accept: 'text/plain,*/*'
          }
        })
        .then((response) => response.text())
        .then((source) => {
          let content = R.contains(this.sourceViewFiles(props), file) ? normalizeReferences(rootPath, props.files, source) : source;
          if (file === props.index) {
            virtualFiles = virtualFiles.concat(this.parseExposedFiles(content));
            if (file.template) {
              return fetch(file.template, {
                headers: {
                  Accept: 'text/plain,*/*'
                }
              })
              .then((response) => response.text())
              .then((template) => {
                // var doc, i, len, node, path, ref, template;
                const doc = new DOMParser().parseFromString(content, 'text/html');
                const ref = doc.querySelectorAll('[data-catalog-project-expose]');
                for (let i = 0, len = ref.length; i < len; i++) {
                  const node = ref[i];
                  const path = node.getAttribute('data-catalog-project-expose');
                  node.removeAttribute('data-catalog-project-expose');
                  node.setAttribute('src', path);
                  node.innerHTML = '';
                }
                virtualFiles.push({
                  path: fileUtils.filename(file.template),
                  content: template.replace('${yield}', doc.body.innerHTML)
                });
                content = content.replace(/\s+data-catalog-project-expose=[\"\'].+?[\"\']/, '');
                return resolve({
                  path: file.target,
                  content: content
                });
              });
            }
            content = content.replace(/\s+data-catalog-project-expose=[\"\'].+?[\"\']/, '');
            return resolve({
              path: file.target,
              content: content
            });
          }
          return resolve({
            path: file.target,
            content: content
          });
        }).catch(reject);
      });
    });

    Promise.all(files).then((filesResponse) =>{
      filesResponse.forEach( (f) => {
        return root.file(f.path, f.content, {
          binary: isImage(f.path)
        });
      });
      virtualFiles.forEach( (f) => {
        return root.file(f.path, f.content, {
          binary: isImage(f.path)
        });
      });
      const blob = zip.generate({
        type: 'blob'
      });
      return saveAs(blob, props.name + '.zip');
    }).catch((error) => {
      throw new Error('Preparing ZIP file failed', error);
    });
  }


}

Project.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.object,
  scrolling: PropTypes.string.isRequired,
  files: PropTypes.array.isRequired,
  size: PropTypes.shape({
    height: PropTypes.string,
    width: PropTypes.string
  }).isRequired,
  sourceView: PropTypes.array,
  theme: PropTypes.object.isRequired
};

export default Radium(Project);
