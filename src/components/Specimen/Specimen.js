import React, { PropTypes } from 'react';
import R from 'ramda';

import Code from './Code/Code';
import Color from './Color/Color';
import Html from './Html/Html';
import Icon from './Icon/Icon';
import Project from './Project/Project';
import UISpec from './UISpec/UISpec';
import DownloadSpecimen from './DownloadSpecimen/DownloadSpecimen';
import projectBodyToProps from './Project/bodyToProps';

// The used plugin is out of date at the moment
import FramedCodeBlock from './Framed/FramedCodeBlock';

const DEFAULT_SPECIMEN = 'html';

const Renderer = {
  code: (props) => <Code body={props.body} theme={props.theme}/>,
  color: (props) => <Color colors={JSON.parse(props.body)} theme={props.theme}/>,
  html: (props) => <Html body={props.body} modifiers={props.config.options} theme={props.theme}/>,
  icon: (props) => <Icon icons={[].concat(JSON.parse(props.body))} theme={props.theme}/>,
  type: (props) => <Html body={props.body} modifiers={props.config.options} theme={props.theme}/>,
  uispec: (props) => <UISpec entries={JSON.parse(props.body)} theme={props.theme}/>,
  project: (props) => <Project {...projectBodyToProps(props.body)} theme={props.theme}/>,
  download: (props) => <DownloadSpecimen {...R.merge( JSON.parse(props.body) )} theme={props.theme}/>,
  framed: (props) => <FramedCodeBlock code={props.body} theme={props.theme}/>
};

// .cg-Specimen {
//   margin: -6px 0 24px 0;

//   & + .cg-Specimen {
//     margin-top: 33px;
//   }

//   h3 + & { margin-top: 12px; }
//   h4 + & { margin-top: 10px; }

//   & + h3 { margin-top: 28px; }
// }

function getStyle() {
  return {
    container: {
      margin: '-6px 0 24px 0'
    }
  };
}


class Specimen extends React.Component {

  static propTypes = {
    body: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired
  }

  render() {
    let {theme, config} = this.props;
    let styles = getStyle(theme);
    let renderer = Renderer[config.specimen];

    let specimen = renderer ? renderer(this.props) : this.throwError(config.specimen);
    return (
      <section style={styles.container}>{specimen}</section>
      );
  }

  throwError(specimen) {
    throw new Error('Unknown specimen: ' + specimen);
  }

  static Config = (input) => {
    let inputValue = input ? input : '';
    let removeEmpty = R.filter(R.complement(R.isEmpty));
    let readInput = R.compose(removeEmpty, R.split('|'));
    let parseOptions = R.compose(R.uniq, removeEmpty, R.split(','));
    let ref = readInput(inputValue);
    let specimen = ref[0];
    let optionsStr = ref[1];
    let options = parseOptions(optionsStr ? optionsStr : '');
    options.contains = R.flip(R.contains)(options);
    return {
      specimen: specimen ? specimen : DEFAULT_SPECIMEN,
      options: options
    };
  }
}

export default Specimen;
