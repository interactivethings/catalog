import React from 'react';
import Page from '../Page/Page';

const Card = (props) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Catalog warning: The `Card` component is deprecated; use `Page` instead.');
  }
  return <Page {...props} />;
};

export default Card;
