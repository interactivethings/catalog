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

const ResponsiveTabs = ( {deviceList, action, activeDevice, theme, parentWidth} ) => {
  const styles = getStyle(theme);
  return (<div style={styles.tabContainer}>
    {deviceList.map((val, i)=>{
      const isTabActive = activeDevice.name === val.name;
      const activeStyles = isTabActive && styles.tabActive;
      return (<div key={i} style={{...styles.tab, ...activeStyles}} onClick={action.bind(this, val)}>
        <Preview proportion={val.width / val.height}/>
        {val.name}{isTabActive &&
          <div style={styles.tabDimension}>
            {activeDevice.width}×{activeDevice.height}
            {isTabActive && parentWidth <= val.width && ', scaled'}
          </div>}
      </div>);
    })}
  </div>);
};

ResponsiveTabs.propTypes = {
  deviceList: PropTypes.array,
  action: PropTypes.func,
  activeDevice: PropTypes.object,
  theme: PropTypes.object,
  parentWidth: PropTypes.number
};

export default ResponsiveTabs;
