import React, { PropTypes, Component } from 'react';
import Hint from './Hint/Hint';
import Span from './Span';

const getUnknownSpecimen = (specimen) => ({theme}) => <Hint warning body={`Unknown Specimen: <strong>${specimen}</strong>`} theme={theme} />;

export default class SpecimenWrapper extends Component {
  render() {
    const {options, body, specimen} = this.props;
    const {theme, getSpecimen} = this.context;
    const Specimen = getSpecimen(specimen) || getUnknownSpecimen(specimen);

    return (
      <Span span={options.span}>
        <Specimen {...options} body={body} theme={theme} />
      </Span>
    );
  }
}

SpecimenWrapper.propTypes = {
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]).isRequired,
  specimen: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired
};

SpecimenWrapper.contextTypes = {
  theme: PropTypes.object.isRequired,
  getSpecimen: PropTypes.func.isRequired
};
