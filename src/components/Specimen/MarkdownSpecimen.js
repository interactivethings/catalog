import React, { PropTypes, Component } from 'react';
import Hint from '../../specimens/Hint';

const getUnknownSpecimen = (specimen) => () => <Hint warning body={`Unknown Specimen: <strong>${specimen}</strong>`} />;

export default class MarkdownSpecimen extends Component {
  render() {
    const {options, body, specimen} = this.props;
    const {getSpecimen} = this.context;
    const Specimen = getSpecimen(specimen) || getUnknownSpecimen(specimen);

    return (
      <Specimen {...options} body={body} />
    );
  }
}

MarkdownSpecimen.propTypes = {
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
  specimen: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

MarkdownSpecimen.contextTypes = {
  getSpecimen: PropTypes.func.isRequired
};
