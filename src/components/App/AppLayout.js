import React, { PropTypes } from 'react';
import CatalogPropTypes from '../../CatalogPropTypes';
import NavigationBar from './NavigationBar';

const SIDE_WIDTH = 251;

const globalStyle = `
@import url(https://fonts.googleapis.com/css?family=Roboto:400,600);
@import url(https://fonts.googleapis.com/css?family=Source+Code+Pro:400,600);

body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
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

function style(
  theme,
  {
    sideBarOffset,
    sideWidth,
    contentWidth,
    contentHeight,
    contentOffset,
    sideBarAnimDur,
    bgVisible
  }
) {
  return {
    container: {
      background: theme.background,
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      position: 'relative'
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
      height: contentHeight,
      width: sideWidth,
      top: 0,
      borderRight: `1px solid ${theme.sidebarColorLine}`,
      transform: `translateX(${sideBarOffset}px)`,
      transition: `transform ${sideBarAnimDur}s`,
      WebkitOverflowScrolling: 'touch'
    },
    navBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: contentHeight,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      opacity: bgVisible ? 1 : 0,
      visibility: bgVisible ? 'visible' : 'hidden',
      transition: `opacity ${sideBarAnimDur}s, visibility ${sideBarAnimDur}s`
    },
    content: {
      boxSizing: 'border-box',
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      position: 'relative',
      width: contentWidth,
      transform: `translateX(${contentOffset}px)`,
      transition: `transform ${sideBarAnimDur}s`
    }
  };
}

class AppLayout extends React.Component {

  constructor() {
    super();
    this.onResize = this.onResize.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      sidebarVisible: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize() {
    this.setState({
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth
    });
  }

  render() {
    const {theme, pages, page} = this.props;
    const { sidebarVisible, viewportWidth, viewportHeight } = this.state;

    const isMobileLayout = viewportWidth < 1000;
    const sideWidth = SIDE_WIDTH - 1;
    let sideBarOffset;
    let contentWidth;
    if (isMobileLayout) {
      sideBarOffset = sidebarVisible ? 0 : -SIDE_WIDTH;
      contentWidth = viewportWidth;
    } else {
      sideBarOffset = 0;
      contentWidth = viewportWidth - SIDE_WIDTH;
    }
    const contentHeight = viewportHeight;
    const contentOffset = isMobileLayout ? 0 : SIDE_WIDTH;
    const sideBarAnimDur = 0.3;
    const bgVisible = isMobileLayout && sidebarVisible;

    let currentStyle = style(this.props.theme, {
      isMobileLayout,
      sideBarOffset,
      sideWidth,
      sideBarAnimDur,
      bgVisible,
      contentWidth,
      contentHeight,
      contentOffset
    });

    const nextPage = pages[page.index + 1];
    const previousPage = pages[page.index - 1];

    return (
      <div style={currentStyle.container}>
        <style>{globalStyle}</style>
        <div style={currentStyle.content}>
          { this.props.children }
          <NavigationBar theme={theme} nextPage={nextPage} previousPage={previousPage} isMobileLayout={isMobileLayout} />
        </div>
        <MenuIcon style={currentStyle.menuIcon} onClick={this.toggleSidebar} onTouchStart={this.toggleSidebar} />
        <div style={currentStyle.navBackground} onClick={this.toggleSidebar} onTouchStart={this.toggleSidebar} />
        <div style={currentStyle.sideNav}>
          { this.props.sideNav }
        </div>
      </div>
    );
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }
}

AppLayout.propTypes = {
  sideNav: PropTypes.node,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired,
  page: CatalogPropTypes.page.isRequired,
  pages: CatalogPropTypes.pages.isRequired
};

export default AppLayout;
