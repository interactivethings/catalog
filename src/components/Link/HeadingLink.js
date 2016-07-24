import React, {PropTypes} from 'react';
import Link from './Link';


const HeadingLink = ({slug, ...rest}) => {
  return <Link to={`#${slug}`} {...rest}>{'> '}</Link>;
};

HeadingLink.propTypes = {
  slug: PropTypes.string.isRequired
};

export default HeadingLink;
