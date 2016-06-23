import React, {PropTypes} from 'react';
import Radium from 'radium';
import {pageShape, pagesShape} from '../../CatalogPropTypes';
import NavigationBar from './NavigationBar';
import PageHeader from '../Page/PageHeader';

const SIDEBAR_WIDTH = 251;
const SIDEBAR_ANIMATION_DURATION = 0.25;

const globalStyle = `
@import url(https://fonts.googleapis.com/css?family=Roboto:400,700,400italic);
@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700);

body {
  margin: 0;
  padding: 0;
}
`;

const MenuIcon = (props) => (
  <svg {...props} width='27px' height='20px' viewBox='0 0 27 20'>
    <g fill='#FFFFFF'>
      <rect x='0' y='16' width='26' height='4' />
      <rect x='0' y='8' width='26' height='4' />
      <rect x='0' y='0' width='26' height='4' />
    </g>
  </svg>
);

const getStyles = (theme, sidebarVisible) => ({
  container: {
    background: theme.background,
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    position: 'relative',
    // Prevent flash of un-media-queried content by Radium
    display: 'none',
    '@media (min-width: 0px)': {
      display: 'block'
    }
  },
  menuIcon: {
    cursor: 'pointer',
    height: 30,
    left: 20,
    position: 'absolute',
    top: 20,
    width: 30
  },
  sideNav: {
    background: theme.sidebarColor,
    color: '#fff',
    overflowY: 'auto',
    position: 'fixed',
    height: '100vh',
    width: SIDEBAR_WIDTH - 1,
    top: 0,
    borderRight: `1px solid ${theme.sidebarColorLine}`,
    transform: `translateX(${sidebarVisible ? 0 : -SIDEBAR_WIDTH}px)`,
    transition: `transform ${SIDEBAR_ANIMATION_DURATION}s ease-in-out`,
    WebkitOverflowScrolling: 'touch',
    '@media (min-width: 1000px)': {
      transform: `translateX(0px)`,
      transition: 'none'
    }
  },
  navBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    opacity: sidebarVisible ? 1 : 0,
    visibility: sidebarVisible ? 'visible' : 'hidden',
    transition: `opacity ${SIDEBAR_ANIMATION_DURATION}s, visibility ${SIDEBAR_ANIMATION_DURATION}s`,
    '@media (min-width: 1000px)': {
      display: 'none'
    }
  },
  content: {
    boxSizing: 'border-box',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    position: 'relative',
    '@media (min-width: 1000px)': {
      marginLeft: SIDEBAR_WIDTH
    }
  }
});

class AppLayout extends React.Component {
  constructor() {
    super();
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      sidebarVisible: false
    };
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }

  render() {
    const {theme, pages, page} = this.props;
    const {sidebarVisible} = this.state;

    let styles = getStyles(this.props.theme, sidebarVisible);

    const nextPage = pages[page.index + 1];
    const previousPage = pages[page.index - 1];

    return (
      <div style={styles.container}>
        <style>{globalStyle}</style>
        <div style={styles.content}>
          <PageHeader theme={theme} title={page.title} superTitle={page.superTitle} />
          <div style={{flex: 1}}>
            { this.props.children }
          </div>
          {!page.hideFromMenu && <NavigationBar theme={theme} nextPage={nextPage} previousPage={previousPage} />}
        </div>
        <MenuIcon style={styles.menuIcon} onClick={this.toggleSidebar} onTouchEnd={this.toggleSidebar} />
        <div style={styles.navBackground} onClick={this.toggleSidebar} onTouchEnd={this.toggleSidebar} />
        <div style={styles.sideNav}>
          { this.props.sideNav }
        </div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  sideNav: PropTypes.node,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired,
  page: pageShape.isRequired,
  pages: pagesShape.isRequired
};

export default Radium(AppLayout);
