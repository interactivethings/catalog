import React, { PropTypes } from 'react';
import { RouteHandler } from 'react-router';

import AppLayout from './AppLayout';
import AppBar from './AppBar';
import Menu from 'components/Menu/Menu';

class App extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    pages: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
      path: PropTypes.string
    })).isRequired,
    page: PropTypes.object.isRequired,
    styles: PropTypes.arrayOf(PropTypes.string),
    scripts: PropTypes.arrayOf(PropTypes.string),
    theme: PropTypes.object.isRequired
  }
  static defaultProps = {
    styles: [],
    scripts: []
  }
  render() {
    const { theme, title, pages, page } = this.props;
    return (
      <AppLayout
        theme={theme}
        topNav={<AppBar title={title} theme={theme} />}
        sideNav={<Menu pages={pages} theme={theme} />}>
        <RouteHandler {...page} theme={theme} />
      </AppLayout>
    );
  }
}

export default App;
