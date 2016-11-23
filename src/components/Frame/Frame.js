import React, {Component, PropTypes} from 'react';
import {catalogShape} from '../../CatalogPropTypes';
import FrameComponent from './FrameComponent';

const renderStyles = (styles) => {
  return styles.map((src, i) => <link key={i} href={src} rel='stylesheet' type='text/css' />);
};

export default class Frame extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {children, width, parentWidth} = this.props;
    const {catalog: {page: {styles}}} = this.context;
    const height = this.state.height || this.props.height;
    const autoHeight = !this.props.height;

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
          head={[
            <style key='stylereset'>{'html,body{margin:0;padding:0}'}</style>,
            ...renderStyles(styles)
          ]}
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

Frame.contextTypes = {
  catalog: catalogShape.isRequired
};
