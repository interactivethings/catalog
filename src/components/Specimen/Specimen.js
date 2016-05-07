// Higher-order Specimen which provides theme

import React, {PropTypes} from 'react';
import Span from './Span';
import parseSpecimenOptions from '../../utils/parseSpecimenOptions';
import {parseSpecimenBody, parseSpecimenYamlBody} from '../../utils/parseSpecimenBody';

export default function Specimen(mapBodyToProps: Function, mapOptionsToProps: Function, options = {}) {
  const parseOptions = parseSpecimenOptions(mapOptionsToProps);
  const parseBody = options.withChildren ? parseSpecimenBody(mapBodyToProps) : parseSpecimenYamlBody(mapBodyToProps);

  return (WrappedSpecimen) => {
    const SpecimenContainer = (props, {theme}) => {
      const {rawOptions, rawBody} = props;
      const optionProps = parseOptions(rawOptions);
      const bodyProps = parseBody(rawBody);
      const span = props.span || bodyProps.span || optionProps.span;

      if (Array.isArray(bodyProps)) {
        return (
          <Span span={span}>
            {bodyProps.map((specimenProps, i) => (
              <Span key={i} span={specimenProps.span}>
                <WrappedSpecimen {...optionProps} {...specimenProps} {...props}  theme={theme} />
              </Span>
            ))}
          </Span>
        );
      }

      return (
        <Span span={span}>
          <WrappedSpecimen {...optionProps} {...bodyProps} {...props} theme={theme} />
        </Span>
      );
    };

    SpecimenContainer.propTypes = {
      span: PropTypes.number,
      rawBody: PropTypes.string,
      rawOptions: PropTypes.string
    };

    SpecimenContainer.contextTypes = {
      theme: PropTypes.object.isRequired
    };

    return SpecimenContainer;
  };
}
