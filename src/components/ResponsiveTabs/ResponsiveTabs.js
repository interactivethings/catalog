import React, {PropTypes} from 'react';
import Preview from './Preview';

function getStyle(theme) {
  return {
    tabContainer: {
      alignItems: 'center',
      background: 'white',
      borderBottom: `1px solid #eee`,
      display: 'flex',
      overflowX: 'scroll',
      width: '100%'
    },
    tab: {
      boxSizing: 'border-box',
      alignItems: 'center',
      background: '#eee',
      color: theme.bgDark,
      cursor: 'pointer',
      display: 'flex',
      flexGrow: 1,
      opacity: 0.7,
      padding: '12px',
      transitionDuration: '.2s, .4s',
      transitionProperty: 'width, background-color, border, opacity'
    },
    tabActive: {
      background: 'white',
      color: theme.textColor,
      cursor: 'auto',
      opacity: 1
    },
    tabDimension: {
      color: theme.bgDark,
      display: 'inline',
      fontFamily: theme.fontMono,
      marginLeft: 5,
      opacity: 0.3
    }
  };
}

const ResponsiveTabs = ( {sizes, action, activeSize, theme, parentWidth} ) => {
  const styles = getStyle(theme);
  return (<div style={styles.tabContainer}>
    {sizes.map((val, i) => {
      const isTabActive = activeSize.name === val.name;
      const activeStyles = isTabActive && styles.tabActive;
      return (<div key={i} style={{...styles.tab, ...activeStyles}} onClick={action.bind(this, val)}>
        <Preview proportion={val.width / val.height}/>
        <div style={styles.description}>
          {val.name}
          <div style={styles.tabDimension}>
            {val.width}×{val.height}
            &thinsp;
            {parentWidth <= val.width && '(scaled)'}
          </div>
        </div>
      </div>);
    })}
  </div>);
};

ResponsiveTabs.propTypes = {
  sizes: PropTypes.array,
  action: PropTypes.func,
  activeSize: PropTypes.object,
  theme: PropTypes.object,
  parentWidth: PropTypes.number
};

export default ResponsiveTabs;
