import React, { PropTypes, Component } from 'react';

const registeredComponents = {
  FooBar: ({name}) => <button>{name}</button>
};

function getStyle(theme) {
  return {
    container: {
      position: 'relative',
      flexBasis: '100%',
      margin: '0 0 20px 0' 
    },
    content: {
      background: `url(${theme.checkerboardPatternLight})`,
      border: 'none',
      borderRadius: '2px',
      boxSizing: 'border-box',
      display: 'block',
      padding: '20px',
      position: 'relative',
      width: '100%'
    }
  };
}

class ReactComponentSpecimen extends Component {
  render() {
    const {theme} = this.context;
    const {component, props} = this.props;
    const styles = getStyle(theme);

    const ComponentClass = registeredComponents[component] || component;

    return (
      <section style={styles.container}>
        <div style={styles.content}>
          {React.createElement(ComponentClass, props)}
        </div>
      </section>
    );
  }
}

ReactComponentSpecimen.propTypes = {
  component: PropTypes.any.isRequired,
  props: PropTypes.object.isRequired
};

ReactComponentSpecimen.contextTypes = {
  theme: PropTypes.object.isRequired
};

export default ReactComponentSpecimen;
