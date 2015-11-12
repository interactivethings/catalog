// Higher-order Specimen which provides theme

import React, {PropTypes} from 'react';
import Span from './Span';

export default function wrapSpecimen(WrappedSpecimen) {
  const Specimen = (props, {theme}) => (
    <Span span={props.span}>
      <WrappedSpecimen />
    </Span>
  );

  Specimen.propTypes = {
    span: PropTypes.number
  };

  Specimen.contextTypes = {
    theme: PropTypes.object.isRequired
  };

  return Specimen;
}
