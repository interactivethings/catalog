import React, {Children} from 'react';
import PropTypes from 'prop-types';
import {StyleRoot} from 'radium';
import DocumentTitle from 'react-document-title';
import {catalogShape} from '../../CatalogPropTypes';

import AppLayout from './AppLayout';
import Menu from '../Menu/Menu';

const getDocumentTitle = ({title, page}) => title === page.superTitle ?
  `${page.superTitle} – ${page.title}` :
  `${title} – ${page.superTitle} – ${page.title}`;

class App extends React.Component {
  render() {
    const {catalog} = this.context;
    return (
      <StyleRoot>
        <DocumentTitle
          title={getDocumentTitle(catalog)}
        />
        <AppLayout
          {...catalog}
          sideNav={<Menu {...catalog} />}
        >
          {
           Children.only(this.props.children)
          }
        </AppLayout>
      </StyleRoot>
    );
  }
}

App.contextTypes = {
  catalog: catalogShape.isRequired
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
