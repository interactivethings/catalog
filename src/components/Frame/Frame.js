import React, {Component, PropTypes} from 'react';
import FrameComponent from './FrameComponent';

export default class Frame extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {children} = this.props;
    const height = this.props.height || this.state.height;
    const autoHeight = this.props.height === void 0;

    const style = {
      width: '100%',
      lineHeight: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      height
    };

    return (
      <div style={{lineHeight: 0}}>
        <FrameComponent
          style={style}
          frameBorder='0'
          allowTransparency='true'
          scrolling='no'
          head={<style>{'html,body{margin:0;padding:0;}'}</style>}
          onRender={autoHeight ? (content) => {
            const contentHeight = content.offsetHeight;
            if (contentHeight !== height) {
              this.setState({height: contentHeight});
            }
          } : null}
        >
          {children}
        </FrameComponent>
      </div>
    );
  }
}

Frame.propTypes = {
  children: PropTypes.element,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
