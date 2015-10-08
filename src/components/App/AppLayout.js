import React, { PropTypes } from 'react';
import hamburgerSrc from 'assets/burger.svg';

const SIDE_WIDTH = 251;

function style(
  theme,
  {
    topHeight,
    sideBarOffset,
    sideWidth,
    contentWidth,
    contentHeight,
    contentOffset,
    contentTopPadding,
    contentLeftPadding,
    sideBarAnimDur,
    sidebarVisible,
    bgVisible
  }
) {
  return {
    menuIcon: {
      cursor: 'pointer',
      height: 30,
      left: 20,
      padding: 10,
      position: 'fixed',
      top: 20,
      width: 30
    },
    container: {
      background: theme.background,
      margin: 0,
      padding: 0,
      position: 'relative'
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
      transition: `left ${sideBarAnimDur}s`
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
      position: 'absolute',
      width: contentWidth,
      top: 0,
      left: contentOffset,
      transition: `left ${sideBarAnimDur}s`,
      padding: `${contentTopPadding}px 0 0 ${contentLeftPadding}px`
    }
  };
}

class AppLayout extends React.Component {
  static propTypes = {
    sideNav: PropTypes.node,
    children: PropTypes.node,
    theme: PropTypes.object.isRequired
  }

  state = {
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    sidebarVisible: true
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
    const contentTopPadding = 100;
    const contentLeftPadding = isMobileLayout ? 50 : 0;
    const sideBarAnimDur = 0.3;
    const bgVisible = isMobileLayout && sidebarVisible;

    let currentStyle = style(this.props.theme, {
      sideBarOffset,
      sideWidth,
      contentWidth,
      contentHeight,
      contentOffset,
      contentTopPadding,
      contentLeftPadding,
      sideBarAnimDur,
      sidebarVisible,
      bgVisible
    });

    return (
      <div style={currentStyle.container}>
        <div style={currentStyle.content}>
          { this.props.children }
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
