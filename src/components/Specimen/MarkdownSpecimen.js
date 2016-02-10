import React, { PropTypes, Component } from 'react';
import Hint from '../../specimens/Hint';
import parseSpecimenType from '../../utils/parseSpecimenType';

const getUnknownSpecimen = (specimenType) => () => <Hint warning>{`Unknown Specimen: **${specimenType}**`}</Hint>;

export default class MarkdownSpecimen extends Component {
  render() {
    const {options, body} = this.props;
    const {getSpecimen} = this.context;
    const specimenType = parseSpecimenType(options);
    const Specimen = getSpecimen(specimenType) || getUnknownSpecimen(specimenType);

    return <Specimen rawOptions={options} rawBody={body} />;
  }
}

MarkdownSpecimen.propTypes = {
  body: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired
};

MarkdownSpecimen.contextTypes = {
  getSpecimen: PropTypes.func.isRequired
};
