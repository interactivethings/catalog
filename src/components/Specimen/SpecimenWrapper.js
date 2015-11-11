import React, { PropTypes, Component } from 'react';
import Hint from './Hint/Hint';

const getUnknownSpecimen = (specimen) => ({theme}) => <Hint warning body={`Unknown Specimen: <strong>${specimen}</strong>`} theme={theme} />;

export default class SpecimenWrapper extends Component {
  render() {
    const {options, body, specimen} = this.props;
    const {theme, getSpecimen} = this.context;
    const Specimen = getSpecimen(specimen) || getUnknownSpecimen(specimen);

    const style = {
      margin: '0 10px 10px 0',
      flexBasis: options.span && window.innerWidth > 640 ?
        `calc(${ options.span / 6 * 100}% - 10px)` :
        'calc(100% - 10px)'
    };

    return (
      <section style={style}>
        <Specimen {...options} body={body} theme={theme} />
      </section>
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
