import React, { PropTypes } from 'react';
import Radium from 'radium';

import MetadataBlock from '../shared/MetadataBlock';

class Icon extends React.Component {
  render() {
    const {icons, theme} = this.props;
    let styles = {
      section: {
        display: 'flex',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: '20px 0',
        overflow: 'auto'
      },
      container: {
        display: 'flex',
        flex: '1 1 auto',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderTop: `1px solid ${theme.lightColor}`,
        marginRight: `${theme.sizeL / 2}px`,
        padding: `${theme.sizeL / 2}px 0`
      },
      single: {
        borderTop: 'none'
      },
      image: {
        alignSelf: 'flex-start',
        flex: '0 0 auto',
        marginRight: `${theme.sizeL / 2}px`,
        padding: `${theme.sizeL / 2}px`,
        background: `url(${theme.checkerboardPatternLight})`
      },
      light: {
        background: `url(${theme.checkerboardPatternLight})`
      },
      dark: {
        background: `url(${theme.checkerboardPatternDark})`
      },
      plain: {
        background: 'transparent',
        padding: `${theme.sizeL / 2}px 0`
      },
      plain_light: {
        background: theme.bgLight,
        padding: `${theme.sizeL / 2}px`
      },
      plain_dark: {
        background: theme.bgDark,
        padding: `${theme.sizeL / 2}px`
      },
      info: {
        alignSelf: 'stretch',
        flex: '1 1 auto',
        width: '13em',
        padding: `${theme.sizeL / 2}px`
      },
      container_vertical: {
        flexDirection: 'column'
      },
      image_vertical: {
        alignSelf: 'stretch',
        flex: '1 0 auto',
        marginRight: 0,
        textAlign: 'center'
      },
      info_vertical: {
        marginBottom: `${theme.sizeL / 4}px`
      }
    };

    let iconsElement = icons.map((icon, key) => {
      let imgSize = {
        width: icon.size && icon.size.width ? icon.size.width + 'px' : 'auto',
        height: icon.size && icon.size.height ? icon.size.height + 'px' : 'auto'
      };
      let singleElement = icons.length <= 1 ? styles.single : undefined;
      // let align = icon.align ? icon.align : undefined;

      let background = []
        .concat(icon.background !== null
          ? icon.background
          : [])
        .join('_');

      let container = icon.align === 'vertical'
        ? [styles.container, styles.container_vertical, singleElement]
        : [styles.container, singleElement];

      let image = icon.align === 'vertical'
        ? [styles.image, styles.image_vertical, imgSize, styles[background]]
        : [styles.image, imgSize, styles[background]];

      let info = icon.align === 'vertical'
        ? [styles.info, styles.info_vertical]
        : styles.info;

      return (
        <div style={container} key={'cg-Specimen-Icon' + key}>
          <img src={icon.image} style={image}/>
          <div style={info}>
            <MetadataBlock
              theme={theme}
              title={icon.title}
              attributes={icon.attributes}
              links={[].concat(icon.link || icon.links)}/>
          </div>
        </div>);
    });

    return (
      <section style={styles.section}>
        {iconsElement}
      </section>
    );
  }
}

Icon.propTypes = {
  theme: PropTypes.object.isRequired,
  icons: PropTypes.array.isRequired
};

export default Radium(Icon);
