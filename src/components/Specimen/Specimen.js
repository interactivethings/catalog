import React, { PropTypes } from 'react';
import R from 'ramda';

import Code from './Code/Code';
import Color from './Color/Color';
import Html from './Html/Html';
import Hint from './Hint/Hint';
import Type from './Type/Type';
import Project from './Project/Project';
import UISpec from './UISpec/UISpec';
import DownloadSpecimen from './DownloadSpecimen/DownloadSpecimen';
import projectBodyToProps from './Project/bodyToProps';

// The used plugin is out of date at the moment
import FramedCodeBlock from './Framed/FramedCodeBlock';
// As is adds mor confusion than benefit at the moment, images and icons should
// be displayed with either UISpec or Html for more complex needs
import Icon from './Icon/Icon';

const DEFAULT_SPECIMEN = 'html';

const Renderer = {
  code: (props) => <Code body={props.body} theme={props.theme} modifiers={props.config.options}/>,
  hint: (props) => <Hint body={props.body} modifiers={props.config.options} theme={props.theme}/>,
  color: (props) => <Color colors={JSON.parse(props.body)} theme={props.theme} modifiers={props.config.options}/>,
  download: (props) => <DownloadSpecimen {...JSON.parse(props.body)} theme={props.theme}/>,
  framed: (props) => <FramedCodeBlock code={props.body} theme={props.theme}/>,
  html: (props) => <Html body={props.body} modifiers={props.config.options} theme={props.theme}/>,
  icon: (props) => <Icon icons={[].concat(JSON.parse(props.body))} theme={props.theme}/>,
  project: (props) => <Project {...projectBodyToProps(props.body)} theme={props.theme}/>,
  type: (props) => <Type entries={JSON.parse(props.body)} modifiers={props.config.options} theme={props.theme}/>,
  uispec: (props) => <UISpec entries={JSON.parse(props.body)} theme={props.theme} />
};

class Specimen extends React.Component {
  render() {
    let {config} = this.props;
    let renderer = Renderer[config.specimen];

    // Responsiveness is not good the moment, ideally we would have the measurements
    // from Applayout available through props or redux
    let customWidth = config.options.filter( modifier => modifier.match(/span/g)).map( modifier => {
      let getInteger = parseInt(modifier.replace( /^\D+/g, ''), 10);
      return {flexBasis: `calc(${ getInteger / 6 * 100}% - 10px)`, margin: '0 10px 10px 0'};
    })[0];

    let specimen = renderer ? renderer(this.props) : this.throwError(config.specimen);
    return (
      <section className='cg-Client' style={customWidth && window.innerWidth > 640 ? customWidth : {flexBasis: 'calc(100% - 10px)'}}>{specimen}</section>
      );
  }

  throwError(specimen) {
    throw new Error('Unknown specimen: ' + specimen);
  }
}

Specimen.Config = (input) => {
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
};

Specimen.propTypes = {
  body: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};

export default Specimen;
