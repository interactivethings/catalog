import React, {Component, PropTypes} from 'react';
import FrameComponent from './FrameComponent';

export default class Frame extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {children, width, parentWidth} = this.props;
    const height = this.state.height || this.props.height;
    const autoHeight = this.props.height === void 0;

    const scaledHeight = this.props.height && width >= parentWidth ? height * (parentWidth / width) : 'auto';

    const style = {
      width: width || '100%',
      lineHeight: 0,
      margin: 0,
      padding: 0,
      border: 'none',
      transformOrigin: '0% 0%',
      height: height,
      overflow: 'hidden',
      transform: `scale( ${width <=  parentWidth ? 1 : parentWidth / width} )`
    };

    return (
      <div style={{lineHeight: 0, width: parentWidth, height: scaledHeight}}>
        <FrameComponent
          style={style}
          frameBorder='0'
          allowTransparency='true'
          scrolling='no'
          head={<style>{'html,body{margin:0;padding:0}'}</style>}
          onRender={autoHeight ? (content) => {
            const contentHeight = content.offsetHeight;
            if (contentHeight !== height) {
              this.setState({height: contentHeight});
            }
          } : ()=>null}
        >
          {children}
        </FrameComponent>
      </div>
    );
  }
}

Frame.propTypes = {
  children: PropTypes.element,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  parentWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
