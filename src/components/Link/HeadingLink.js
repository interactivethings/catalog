import React, {PropTypes} from 'react';
import Link from './Link';
import {catalogShape} from '../../CatalogPropTypes';

const style = (theme) => ({
  headingLink: {
    float: 'left',
    marginLeft: -18,
    color: theme.lightColor,
    fill: theme.lightColor,
    ':hover': {
      color: theme.linkColor,
      fill: theme.linkColor,
      textDecoration: 'none'
    }
  }
});

const LinkIcon = () => (
  <svg width='14px' height='14px' viewBox='0 0 16 16'><g  transform='translate(0, 0)'>
  <path d='M4.5,16c-1.2,0-2.3-0.5-3.2-1.3c-1.8-1.8-1.8-4.6,0-6.4L2,7.6L3.4,9L2.7,9.7&#10;&#9;c-1,1-1,2.6,0,3.6c1,1,2.6,1,3.6,0l3-3c1-1,1-2.6,0-3.6L8.6,6L10,4.6l0.7,0.7c1.8,1.8,1.8,4.6,0,6.4l-3,3C6.9,15.5,5.7,16,4.5,16z'/>
  <path d='M6,11.4l-0.7-0.7c-1.8-1.8-1.8-4.6,0-6.4l3-3c0.9-0.9,2-1.3,3.2-1.3s2.3,0.5,3.2,1.3c1.8,1.8,1.8,4.6,0,6.4&#10;&#9;L14,8.4L12.6,7l0.7-0.7c1-1,1-2.6,0-3.6c-1-1-2.6-1-3.6,0l-3,3c-1,1-1,2.6,0,3.6L7.4,10L6,11.4z'/>
  </g></svg>
);

const HeadingLink = ({slug, ...rest}, {catalog}) => {
  return <Link className='HeadingLink' title={'Link to this section'} to={`#${slug}`} aria-hidden style={style(catalog.theme).headingLink} {...rest}><LinkIcon /></Link>;
};

HeadingLink.propTypes = {
  slug: PropTypes.string.isRequired
};

HeadingLink.contextTypes = {
  catalog: catalogShape.isRequired
};

export default HeadingLink;
