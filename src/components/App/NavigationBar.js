import React, {PropTypes} from 'react';
import Radium from 'radium';
import {getFontSize} from '../../styles/typography';
import {pageShape} from '../../CatalogPropTypes';
import Link from '../Link/Link';


// The vertical and horizontal padding inside the left/right nav
// link element.
const verticalPadding = 28;
const horizontalPadding = 21;

function getStyles(theme) {
  return {
    navbar: {
      width: '100%',
      backgroundColor: theme.bgLight
    },
    navlink: {
      boxSizing: 'border-box',
      display: 'inline-block',
      verticalAlign: 'top',
      width: '50%',
      transition: '.2s background',
      ':hover': {
        background: theme.lightColor
      }
    },
    leftNavLink: {
      padding: `${verticalPadding}px 0 ${verticalPadding}px ${horizontalPadding}px`,
      textAlign: 'left',
      '@media (min-width: 1000px)': {
        padding: `${verticalPadding}px 0 ${verticalPadding}px ${horizontalPadding * 2}px`
      }
    },
    rightNavLink: {
      padding: `${verticalPadding}px ${horizontalPadding}px ${verticalPadding}px 0`,
      textAlign: 'right',
      borderLeft: `1px solid ${theme.background}`,
      '@media (min-width: 1000px)': {
        padding: `${verticalPadding}px ${horizontalPadding * 2}px ${verticalPadding}px 0`
      }
    },
    link: {
      color: theme.brandColor,
      display: 'block',
      fontFamily: theme.fontFamily,
      textDecoration: 'none'
    },
    leftLinkIcon: {
      display: 'none',
      margin: '0 24px 0 0',
      verticalAlign: 'middle',
      '@media (min-width: 1000px)': {
        display: 'inline'
      }
    },
    rightLinkIcon: {
      display: 'none',
      margin: '0 0 0 24px',
      verticalAlign: 'middle',
      '@media (min-width: 1000px)': {
        display: 'inline'
      }
    },
    linkIconPath: {
      stroke: 'none',
      fill: theme.brandColor
    },
    linklabels: {
      display: 'block',
      verticalAlign: 'middle',
      '@media (min-width: 1000px)': {
        display: 'inline-block'
      }
    },
    linkSuperTitle: {
      fontSize: getFontSize(theme, 0),
      margin: 0,
      fontWeight: 400
    },
    linkTitle: {
      fontSize: getFontSize(theme, 1),
      margin: 0,
      fontWeight: 400
    }
  };
}

class NavigationBar extends React.Component {

  render() {
    const {nextPage, previousPage, theme} = this.props;

    const styles = getStyles(theme);

    const leftIcon = (
      <svg style={styles.leftLinkIcon} width='37px' height='26px' viewBox='0 0 37 26'>
        <path style={styles.linkIconPath} d='M12.2925,0.2925 C12.6845,-0.0975 13.3165,-0.0975 13.7085,0.2925 C14.0985,0.6845 14.0985,1.3165 13.7085,1.7085 L3.4145,12.0005 L36.0005,12.0005 C36.5525,12.0005 37.0005,12.4485 37.0005,13.0005 C37.0005,13.5525 36.5525,14.0005 36.0005,14.0005 L3.4145,14.0005 L13.7085,24.2925 C14.0985,24.6845 14.0985,25.3165 13.7085,25.7085 C13.5125,25.9025 13.2565,26.0005 13.0005,26.0005 C12.7445,26.0005 12.4885,25.9025 12.2925,25.7085 L0.2925,13.7085 C-0.0975,13.3165 -0.0975,12.6845 0.2925,12.2925 L12.2925,0.2925 Z'></path>
      </svg>
    );
    const rightIcon = (
      <svg style={styles.rightLinkIcon} width='37px' height='26px' viewBox='0 0 37 26'>
        <path style={styles.linkIconPath} d='M24.708,0.2925 C24.316,-0.0975 23.684,-0.0975 23.292,0.2925 C22.902,0.6845 22.902,1.3165 23.292,1.7085 L33.586,12.0005 L1,12.0005 C0.448,12.0005 0,12.4485 0,13.0005 C0,13.5525 0.448,14.0005 1,14.0005 L33.586,14.0005 L23.292,24.2925 C22.902,24.6845 22.902,25.3165 23.292,25.7085 C23.488,25.9025 23.744,26.0005 24,26.0005 C24.256,26.0005 24.512,25.9025 24.708,25.7085 L36.708,13.7085 C37.098,13.3165 37.098,12.6845 36.708,12.2925 L24.708,0.2925 Z'></path>
      </svg>
    );

    return (
      <div style={styles.navbar}>
        <div style={styles.navlink} key='left'>{
          previousPage &&
          <Link to={previousPage.path} style={{...styles.link, ...styles.leftNavLink}}>
            { leftIcon }
            <div style={styles.linklabels}>
              <h4 style={styles.linkSuperTitle}>{ previousPage.superTitle }</h4>
              <h3 style={styles.linkTitle}>{ previousPage.title }</h3>
            </div>
          </Link>
        }</div>
        <div style={styles.navlink} key='right'>{
          nextPage &&
          <Link to={nextPage.path} style={{...styles.link, ...styles.rightNavLink}}>
            <div style={styles.linklabels}>
              <h4 style={styles.linkSuperTitle}>{ nextPage.superTitle }</h4>
              <h3 style={styles.linkTitle}>{ nextPage.title }</h3>
            </div>
            { rightIcon }
          </Link>
        }</div>
      </div>
    );
  }
}

NavigationBar.propTypes = {
  theme: PropTypes.object.isRequired,
  nextPage: pageShape,
  previousPage: pageShape
};

export default Radium(NavigationBar);
