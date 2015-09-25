import React, { PropTypes } from 'react';

import './AppLayout.scss';

class AppLayout extends React.Component {
  static propTypes = {
    topNav: PropTypes.node,
    sideNav: PropTypes.node,
    content: PropTypes.node
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
    const sideWidthDefault = 251;
    const sideWidth = sidebarVisible ? sideWidthDefault : 0;
    const contentWidth = sidebarVisible ? (viewportWidth - sideWidth) : viewportWidth;
    const contentHeight = viewportHeight - topHeight;

    return (
      <div className='cg-AppLayout'>
        <div className='cg-AppLayout-topNav' onClick={::this.toggleSidebar} style={{height: topHeight, width: sideWidthDefault}}>
          { this.props.topNav }
        </div>
        { sidebarVisible &&
          <div className='cg-AppLayout-sideNav' style={{height: contentHeight, width: sideWidth, top: topHeight}}>
            { this.props.sideNav }
          </div>
        }
        <div className='cg-AppLayout-content' style={{width: contentWidth, top: topHeight, left: sideWidth}}>
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
