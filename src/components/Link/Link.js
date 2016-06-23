import React, {PropTypes} from 'react';
import Radium from 'radium';
import {Link as RouterLink} from 'react-router';

const external = /^https?:\/\//;

const RadiumRouterLink = Radium(RouterLink);

const Link = ({to, ...rest}) => external.test(to) ? <a href={to} {...rest} /> : <RadiumRouterLink to={to} {...rest} />;

Link.propTypes = {
  to: PropTypes.string.isRequired
};

export default Link;
