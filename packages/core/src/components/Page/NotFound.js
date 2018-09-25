import PropTypes from "prop-types";
import React from "react";
import Page from "./Page";

const NotFound = ({ location }) => (
  <Page>{`Sorry, no page exists at **${location.pathname}**.`}</Page>
);

NotFound.propTypes = {
  location: PropTypes.object.isRequired
};

export default NotFound;
