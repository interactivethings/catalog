import PropTypes from "prop-types";
// Higher-order Specimen which provides theme

import React from "react";
import { catalogShape } from "../../CatalogPropTypes";
import Span from "./Span";
import parseSpecimenOptions from "../../utils/parseSpecimenOptions";
import {
  parseSpecimenBody,
  parseSpecimenYamlBody
} from "../../utils/parseSpecimenBody";

export default function Specimen(
  mapBodyToProps,
  mapOptionsToProps,
  options = {}
) {
  const parseOptions = parseSpecimenOptions(mapOptionsToProps);
  const parseBody = options.withChildren
    ? parseSpecimenBody(mapBodyToProps)
    : parseSpecimenYamlBody(mapBodyToProps);

  return WrappedSpecimen => {
    const SpecimenContainer = (props, { catalog }) => {
      const { rawOptions, rawBody } = props;
      const optionProps = parseOptions(rawOptions);
      const bodyProps = parseBody(rawBody, catalog.page.imports);
      const span = props.span || bodyProps.span || optionProps.span;

      return (
        <Span span={span}>
          <WrappedSpecimen
            {...optionProps}
            {...bodyProps}
            {...props}
            catalog={catalog}
          />
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
