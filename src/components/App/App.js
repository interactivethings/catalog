import React, { PropTypes } from 'react';
import {pages, page} from 'core/PropTypes';

import AppLayout from './AppLayout';
import Menu from 'components/Menu/Menu';

class App extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    pages: pages.isRequired,
    pageNames: PropTypes.arrayOf(PropTypes.string),
    page: page.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string),
    scripts: PropTypes.arrayOf(PropTypes.string),
    theme: PropTypes.object.isRequired
  }
  static defaultProps = {
    styles: [],
    scripts: []
  }
  render() {
    const { theme, title, logoSrc, pages, page, history } = this.props;

    return (
      <AppLayout
        theme={theme}
        sideNav={<Menu title={title} logoSrc={logoSrc} pages={pages} theme={theme} history={history} />}
        pageNames={this.props.pageNames}
        pages={this.props.pages}
        currentPage={page ? page.name : 'foo'}
      >
        {
         this.props.children
        }
      </AppLayout>
    );
  }
}

export default App;
