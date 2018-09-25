import PropTypes from "prop-types";
import React, { Component } from "react";
import Hint from "../../specimens/Hint";
import parseSpecimenType from "../../utils/parseSpecimenType";

// eslint-disable-next-line react/display-name
const getUnknownSpecimen = specimenType => () => (
  <Hint warning>{`Unknown Specimen: **${specimenType}**`}</Hint>
);

export default class MarkdownSpecimen extends Component {
  render() {
    const { options, body, getSpecimen } = this.props;
    const specimenType = parseSpecimenType(options);
    const Specimen =
      getSpecimen(specimenType) || getUnknownSpecimen(specimenType);

    return <Specimen rawOptions={options} rawBody={body} />;
  }
}

MarkdownSpecimen.propTypes = {
  body: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
  getSpecimen: PropTypes.func.isRequired
};
