import React from 'react';
import {renderToString} from 'react-dom/server';
import {createMemoryHistory} from 'react-router';

import CatalogRoot from './components/CatalogRoot';


export default function staticRender(path, userAgent, catalogConfig) {
  return renderToString(<CatalogRoot
    reactRouterHistory={createMemoryHistory(path)}
    radiumConfig={{userAgent}}
    catalogConfig={catalogConfig}
  />);
}
