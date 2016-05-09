// Higher-order Specimen which provides theme

import React, {PropTypes} from 'react';
import {catalogShape} from '../../CatalogPropTypes';
import Span from './Span';
import parseSpecimenOptions from '../../utils/parseSpecimenOptions';
import parseSpecimenBody from '../../utils/parseSpecimenBody';

export default function Specimen(mapBodyToProps: Function, mapOptionsToProps: Function) {
  const parseOptions = parseSpecimenOptions(mapOptionsToProps);
  const parseBody = parseSpecimenBody(mapBodyToProps);

  return (WrappedSpecimen) => {
    const SpecimenContainer = (props, {catalog}) => {
      const {rawOptions, rawBody} = props;
      const optionProps = parseOptions(rawOptions);
      const bodyProps = parseBody(rawBody);
      const span = props.span || bodyProps.span || optionProps.span;

      if (Array.isArray(bodyProps)) {
        return (
          <Span span={span}>
            {bodyProps.map((specimenProps, i) => (
              <Span key={i} span={specimenProps.span}>
                <WrappedSpecimen {...optionProps} {...specimenProps} {...props} catalog={catalog} />
              </Span>
            ))}
          </Span>
        );
      }

      return (
        <Span span={span}>
          <WrappedSpecimen {...optionProps} {...bodyProps} {...props} catalog={catalog} />
        </Span>
      );
    };

    SpecimenContainer.propTypes = {
      span: PropTypes.number,
      rawBody: PropTypes.string,
      rawOptions: PropTypes.string
    };

    SpecimenContainer.contextTypes = {
      catalog: catalogShape.isRequired
    };

    return SpecimenContainer;
  };
}
