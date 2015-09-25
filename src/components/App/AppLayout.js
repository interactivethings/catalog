import React, { PropTypes } from 'react';

const SIDE_WIDTH = 251;

function style(
  theme,
  {
    topHeight,
    sideWidth,
    contentWidth,
    contentHeight
  }
) {
  return {
    topNav: {
      position: 'fixed',
      left: 0,
      top: 0,
      cursor: 'pointer',
      zIndex: 10,
      height: topHeight,
      width: SIDE_WIDTH
    },
    sideNav: {
      background: theme.brandColor,
      color: '#fff',
      overflowY: 'auto',
      position: 'fixed',
      left: 0,
      height: contentHeight,
      width: sideWidth,
      top: topHeight
    },
    content: {
      position: 'absolute',
      width: contentWidth,
      top: topHeight,
      left: sideWidth
    }
  };
}

class AppLayout extends React.Component {
  static propTypes = {
    topNav: PropTypes.node,
    sideNav: PropTypes.node,
    content: PropTypes.node,
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

    const topHeight = 74;
    const sideWidth = sidebarVisible ? SIDE_WIDTH : 0;
    const contentWidth = sidebarVisible ? (viewportWidth - sideWidth) : viewportWidth;
    const contentHeight = viewportHeight - topHeight;

    let currentStyle = style(this.props.theme, {
      topHeight,
      sideWidth,
      contentWidth,
      contentHeight
    });

    return (
      <div>
        <div onClick={::this.toggleSidebar} style={currentStyle.topNav}>
          { this.props.topNav }
        </div>
        { sidebarVisible &&
          <div style={currentStyle.sideNav}>
            { this.props.sideNav }
          </div>
        }
        <div style={currentStyle.content}>
          { this.props.content }
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
