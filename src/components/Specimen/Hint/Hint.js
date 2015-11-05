import React, { PropTypes } from 'react';
import { Style as RadiumStyle } from 'radium';
import {text} from 'scaffold/typography';

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

class Hint extends React.Component {
  render() {
    const {theme, body} = this.props;
    let styles = getStyle(theme);
    return (
      <section style={styles.container} className='cg-Hint'>
        <RadiumStyle
          scopeSelector='.cg-Hint'
          rules={{
            pre: {
              display: 'inline',
              background: '#ffefaa',
              padding: '4px 5px',
              whiteSpace: 'pre-wrap'
            }
          }}/>
          <div dangerouslySetInnerHTML={{__html: body}}/>
        </section>
      );
  }
}

Hint.propTypes = {
  body: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hint;
