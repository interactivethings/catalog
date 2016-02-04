import React from 'react';

const Foo = ({name, children, ...rest}) => (
  <div {...rest} >
    <strong>{name}</strong>
    <div>{children}</div>
  </div>
);

export default Foo;
