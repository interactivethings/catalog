/* eslint-disable comma-dangle */
import React, { PropTypes } from 'react';
import {pages} from 'core/PropTypes';
import Link from 'components/Link/Link';
import hamburgerSrc from 'assets/menu-icon.svg';

const SIDE_WIDTH = 251;

function style(
  theme,
  {
    isMobileLayout,
    sideBarOffset,
    sideWidth,
    contentWidth,
    contentHeight,
    contentOffset,
    sideBarAnimDur,
    bgVisible,
    navPadding,
  }
) {
  return {
    container: {
      background: theme.background,
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    menuIcon: {
      cursor: 'pointer',
      height: 30,
      left: 20,
      position: 'absolute',
      top: 20,
      width: 30,
    },
    sideNav: {
      background: theme.sidebarColor,
      color: '#fff',
      overflowY: 'auto',
      position: 'fixed',
      left: sideBarOffset,
      height: contentHeight,
      width: sideWidth,
      top: 0,
      transition: `left ${sideBarAnimDur}s`,
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
      transition: `opacity ${sideBarAnimDur}s, visibility ${sideBarAnimDur}s`,
    },
    navbar: {
      width: '100%',
      backgroundColor: theme.bgLight,
    },
    navlink: {
      boxSizing: 'border-box',
      display: 'inline-block',
      verticalAlign: 'top',
      width: '50%',
    },
    leftNavLink: {
      padding: `36px 0 36px ${navPadding}px`,
      textAlign: 'left',
    },
    rightNavLink: {
      padding: `36px ${navPadding}px 36px 0`,
      textAlign: 'right',
      borderLeft: `1px solid ${theme.background}`
    },
    link: {
      color: theme.brandColor,
      display: 'block',
      fontFamily: theme.fontFamily,
      textDecoration: 'none',
    },
    leftLinkIcon: {
      margin: '0 24px 0 0',
      verticalAlign: 'middle',
    },
    rightLinkIcon: {
      margin: '0 0 0 24px',
      verticalAlign: 'middle',
    },
    linkIconPath: {
      stroke: 'none',
      fill: theme.brandColor,
    },
    linklabels: {
      display: isMobileLayout ? 'block' : 'inline-block',
      verticalAlign: 'middle',
    },
    linkSuperTitle: {
      fontSize: theme.fontM,
      margin: '0',
    },
    linkTitle: {
      fontSize: theme.fontL,
      margin: '0',
    },
    content: {
      boxSizing: 'border-box',
      position: 'relative',
      width: contentWidth,
      left: contentOffset,
    }
  };
}

class AppLayout extends React.Component {
  static propTypes = {
    sideNav: PropTypes.node,
    children: PropTypes.node,
    theme: PropTypes.object.isRequired,
    pageNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    pages: pages.isRequired,
    currentPage: PropTypes.string,
  }

  state = {
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    sidebarVisible: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    this.setState({
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth
    });
  }

  render() {
    const { sidebarVisible, viewportWidth, viewportHeight } = this.state;

    const isMobileLayout = viewportWidth < 1000;
    const sideWidth = SIDE_WIDTH;
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
    const navPadding = isMobileLayout ? 26 : 60;

    let currentStyle = style(this.props.theme, {
      isMobileLayout,
      sideBarOffset,
      sideWidth,
      contentWidth,
      contentHeight,
      contentOffset,
      sideBarAnimDur,
      bgVisible,
      navPadding,
    });

    let pageIndex = this.props.pageNames.indexOf(this.props.currentPage);
    let prevPage = this.props.pages[pageIndex - 1];
    let nextPage = this.props.pages[pageIndex + 1];

    let leftIcon = (
      <svg style={currentStyle.leftLinkIcon} width='37px' height='26px' viewBox='0 0 37 26'>
        <path style={currentStyle.linkIconPath} d='M12.2925,0.2925 C12.6845,-0.0975 13.3165,-0.0975 13.7085,0.2925 C14.0985,0.6845 14.0985,1.3165 13.7085,1.7085 L3.4145,12.0005 L36.0005,12.0005 C36.5525,12.0005 37.0005,12.4485 37.0005,13.0005 C37.0005,13.5525 36.5525,14.0005 36.0005,14.0005 L3.4145,14.0005 L13.7085,24.2925 C14.0985,24.6845 14.0985,25.3165 13.7085,25.7085 C13.5125,25.9025 13.2565,26.0005 13.0005,26.0005 C12.7445,26.0005 12.4885,25.9025 12.2925,25.7085 L0.2925,13.7085 C-0.0975,13.3165 -0.0975,12.6845 0.2925,12.2925 L12.2925,0.2925 Z'></path>
      </svg>
    );

    return (
      <div style={currentStyle.container}>
        <div style={currentStyle.content}>
          { this.props.children }
          <div style={currentStyle.navbar}>
            <div style={{ ...currentStyle.navlink, ...currentStyle.leftNavLink }}>{
              prevPage &&
              <Link to={prevPage.path} style={currentStyle.link}>
                { !isMobileLayout && leftIcon }
                <div style={currentStyle.linklabels}>
                  <h4 style={currentStyle.linkSuperTitle}>{ prevPage.superTitle }</h4>
                  <h3 style={currentStyle.linkTitle}>{ prevPage.title }</h3>
                </div>
                { isMobileLayout && leftIcon }
              </Link>
            }</div>
            <div style={{ ...currentStyle.navlink, ...currentStyle.rightNavLink }}>{
              nextPage &&
              <Link to={nextPage.path} style={currentStyle.link}>
                <div style={currentStyle.linklabels}>
                  <h4 style={currentStyle.linkSuperTitle}>{ nextPage.superTitle }</h4>
                  <h3 style={currentStyle.linkTitle}>{ nextPage.title }</h3>
                </div>
                <svg style={currentStyle.rightLinkIcon} width='37px' height='26px' viewBox='0 0 37 26'>
                  <path style={currentStyle.linkIconPath} d='M24.708,0.2925 C24.316,-0.0975 23.684,-0.0975 23.292,0.2925 C22.902,0.6845 22.902,1.3165 23.292,1.7085 L33.586,12.0005 L1,12.0005 C0.448,12.0005 0,12.4485 0,13.0005 C0,13.5525 0.448,14.0005 1,14.0005 L33.586,14.0005 L23.292,24.2925 C22.902,24.6845 22.902,25.3165 23.292,25.7085 C23.488,25.9025 23.744,26.0005 24,26.0005 C24.256,26.0005 24.512,25.9025 24.708,25.7085 L36.708,13.7085 C37.098,13.3165 37.098,12.6845 36.708,12.2925 L24.708,0.2925 Z'></path>
                </svg>
              </Link>
            }</div>
          </div>
        </div>
        <img style={currentStyle.menuIcon} src={hamburgerSrc} onClick={::this.toggleSidebar} />
        <div style={currentStyle.navBackground} onClick={::this.toggleSidebar} />
        <div style={currentStyle.sideNav}>
          { this.props.sideNav }
        </div>
      </div>
    );
  }

  toggleSidebar() {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }
}

export default AppLayout;
