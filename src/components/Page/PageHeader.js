import React, {Component, PropTypes} from 'react';
import Radium from 'radium';
import {heading} from '../../styles/typography';

class PageHeader extends Component {
  render() {
    const {theme, title, superTitle} = this.props;

    return (
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        height: theme.pageHeadingHeight,
        background: theme.pageHeadingBackground
      }} >
        <div style={{
          position: 'absolute',
          bottom: theme.sizeL,
          left: theme.sizeL,
          '@media (min-width: 1000px)': {
            left: theme.sizeL * 2
          }
        }} >
          <h2 style={{
            ...heading(theme, 1),
            color: theme.pageHeadingTextColor,
            opacity: 0.6,
            margin: 0
          }}>
            {superTitle}
          </h2>
          <h1 style={{
            ...heading(theme, 4),
            color: theme.pageHeadingTextColor,
            margin: 0
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
  title: PropTypes.string.isRequired,
  superTitle: PropTypes.string.isRequired
};

export default Radium(PageHeader);

