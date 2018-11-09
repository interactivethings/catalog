import React from "react";
import warning from "../../utils/warning";
import Page from "../Page/Page";

const Card = props => {
  warning(false, "The `Card` component is deprecated; use `Page` instead.");

  return <Page {...props} />;
};

export default Card;
