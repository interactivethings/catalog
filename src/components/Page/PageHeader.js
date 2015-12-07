import React, {Component, PropTypes} from 'react';
import {heading} from '../../scaffold/typography';

export default class PageHeader extends Component {
  render() {
    const {theme, margin, title, superTitle} = this.props;

    return (
      <div style={{
        boxSizing: 'border-box',
        margin: `0 -${margin}px ${margin}px -${margin}px`,
        position: 'relative',
        height: theme.pageHeadingHeight,
        background: theme.pageHeadingBackground,
        flexBasis: `calc(100% + ${margin * 2}px)`
      }} >
        <div style={{
          position: 'absolute',
          bottom: theme.sizeL,
          left: margin
        }} >
          <h2 style={{
            ...heading(theme, {level: 4}),
            color: theme.pageHeadingTextColor,
            opacity: 0.6,
            marginBottom: 0
          }}>
            {superTitle}
          </h2>
          <h1 style={{
            ...heading(theme, {level: 2}),
            color: theme.pageHeadingTextColor,
            marginBottom: 0
          }}>
            {title}
          </h1>
        </div>
      </div>
    );
  }
}

PageHeader.propTypes = {
  theme: PropTypes.object.isRequired,
  margin: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  superTitle: PropTypes.string.isRequired
};
