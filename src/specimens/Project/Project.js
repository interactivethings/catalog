import React, { PropTypes } from 'react';
import R from 'ramda';
import JSZip from 'jszip';
import Radium from 'radium';
import Specimen from '../../components/Specimen/Specimen';
// Polyfill for DOMParser.parseFromString support
import '../../utils/DOMParser';

import fileUtils from '../../utils/fileUtils';
import saveAs from '../../utils/FileSaver';
import bodyToProps from './bodyToProps';
import {text, link} from '../../scaffold/typography';

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
      display: 'block',
      marginBottom: 20
    },
    tabBar: {
      border: '1px solid #eee',
      minHeight: 45
    },
    link: {
      ...text(theme, {level: 2}),
      ...link(theme),
      padding: '10px 20px',
      color: theme.linkColor,
      display: 'inline-block',
      float: 'right'
    }
  };
}

const imagePathRe = /\.(jpe?g|gif|png)$/;
const isImage = (path) => imagePathRe.test(path);

class Project extends React.Component {
  render() {
    let {theme, body} = this.props;
    const projectConfig = bodyToProps(body);
    const {index, scrolling, files, size} = projectConfig;

    let styles = getStyle(theme);
    let sourceFiles = this.sourceViewFiles(projectConfig);

    return (
      <div className='cg-Specimen-Project' style={styles.container}>
        <iframe
          src={index.source}
          scrolling={scrolling}
          marginHeight='0'
          marginWidth='0'
          style={[styles.frame, size]}
        />
        <div style={sourceFiles.length > 1 ? styles.tabBar : null}>
          <a key={'new-window'} style={styles.link} href={index.source} target='_blank'>Open in new tab</a>
          <a key={'download'} style={styles.link} href='#' onClick={this.download.bind(this, projectConfig)}>Download as .zip</a>
          <TabbedSourceView
            rootPath={fileUtils.dirname(index.source)}
            files={files}
            theme={theme}
            sourceFiles={sourceFiles}
          />
        </div>
      </div>
    );
  }

  sourceViewFiles(projectConfig) {
    return projectConfig.files.filter((d) => {
      return R.contains(d.target, R.or(projectConfig.sourceView, []));
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

  download(projectConfig, evt) {
    evt.preventDefault();

    let zip = new JSZip();
    let root = zip.folder(projectConfig.name);
    let rootPath = fileUtils.dirname(projectConfig.index.source);
    let virtualFiles = [];

    // It worked! The monkeys banged away on the keyboard and something functioning
    // came out of it! Such mess, but such works. Wow.

    let files = projectConfig.files.map((file) => {
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
          let content = R.contains(this.sourceViewFiles(projectConfig), file) ? normalizeReferences(rootPath, projectConfig.files, source) : source;
          if (file === projectConfig.index) {
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
      return saveAs(blob, projectConfig.name + '.zip');
    }).catch((error) => {
      throw new Error('Preparing ZIP file failed', error);
    });
  }


}

Project.propTypes = {
  theme: PropTypes.object.isRequired,
  body: PropTypes.object.isRequired
};

export default Specimen(Radium(Project));
