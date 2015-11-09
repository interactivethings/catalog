import React, { PropTypes, Component } from 'react';
import {text} from 'scaffold/typography';


const registeredComponents = {
  FooBar: ({name}) => <button>{name}</button>
};

function getStyle(theme) {
  return {
    container: {
      ...text(theme, {level: 2}),
      fontFamily: theme.fontFamily,
      background: '#fff6dd',
      color: '#ffb400',
      flexBasis: '100%',
      border: '1px solid #ffefaa',
      padding: '20px',
      borderRadius: '2px',
      marginTop: 10
    }
  };
}

class ReactComponentSpecimen extends Component {
  render() {
    const {theme, component, props} = this.props;
    const styles = getStyle(theme);

    const ComponentClass = registeredComponents[component] || component;

    return (
      <section style={styles.container}>
        {React.createElement(ComponentClass, props)}
      </section>
    );
  }
}

ReactComponentSpecimen.propTypes = {
  theme: PropTypes.object.isRequired,
  component: PropTypes.any.isRequired,
  props: PropTypes.object.isRequired
};

export default ReactComponentSpecimen;
