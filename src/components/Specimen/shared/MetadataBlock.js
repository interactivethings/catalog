import React, { PropTypes } from 'react';
import Radium from 'radium';
import { heading, text, link } from '../../../scaffold/typography';

function generateAttributeElement(attributes) {
  return attributes.map((attribute, i) => {
    return (
      <li key={`${attribute}-${i}`}>
        {attribute}
      </li>);
  });
}

function generateLinkElement(links, style) {
  return links.map((linkElement, i) => {
    return (
      <li key={`${linkElement}-${i}`}>
        <a key={i} style={style} href={linkElement}>
          {linkElement}
        </a>
      </li>);
  });
}

class MetadataBlock extends React.Component {
  render() {
    const {theme, attributes, title, links} = this.props;
    let styles = {
      title: {
        ...heading(theme, {level: 5})
      },
      list: {
        ...text(theme, {level: 3}),
        listStyle: 'none',
        padding: 0
      },
      link: {
        ...link(theme)
      }
    };

    let titleElement = title ? <h2 style={styles.title}>{title}</h2> : null;
    let attributeElement = attributes && attributes.length > 0
      ? <ul style={styles.list}>{generateAttributeElement(attributes)}</ul>
      : null;
    let linkElement = links && links.length > 0
      ? <ul style={styles.list}>{generateLinkElement(links, styles.link)}</ul>
      : null;

    return (
      <div>
        {titleElement}
        {attributeElement}
        {linkElement}
      </div>
    );
  }
}

MetadataBlock.defaultProps = {
  theme: {}
};

MetadataBlock.propTypes = {
  theme: PropTypes.object.isRequired,
  title: PropTypes.string,
  attributes: PropTypes.array,
  links: PropTypes.array
};

export default Radium(MetadataBlock);
