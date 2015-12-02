import React, { Component, PropTypes } from 'react';
import { Style as RadiumStyle } from 'radium';
import {heading, text, code, inlineElements, inlineBlockquote} from '../../scaffold/typography';
import {inlineUlist, inlineOlist } from '../../scaffold/lists';

const cardContainer = () => ({maxWidth: 671});

class Card extends Component {
  render() {
    const {theme} = this.context;
    const {children} = this.props;

    let inlineBlockquoteRules = inlineBlockquote(theme);
    inlineBlockquoteRules.blockquote = {
      ...cardContainer(theme),
      ...inlineBlockquoteRules.blockquote,
      borderLeft: 'none',
      margin: 0,
      opacity: 0.5
    };

    return (
      <section className='cg-Card' style={{
        margin: `${theme.sizeL}px 0`,
        padding: '28px 11px 14px 21px',
        position: 'relative',
        display: 'flex',
        flexFlow: 'row wrap',
        maxWidth: 1140
      }} >
        <RadiumStyle
          scopeSelector='.cg-Card >'
          rules={{
            // h2: {
            //   ...cardContainer(theme),
            //   ...heading(theme, {level: 1}),
            //   marginBottom: 20,
            //   maxWidth: 'none',
            //   flexBasis: '100%'
            // },
            h3: {
              ...cardContainer(theme),
              ...heading(theme, {level: 3}),
              marginTop: 15,
              marginBottom: 10,
              maxWidth: 'none',
              flexBasis: '100%'
            },
            'h3 code': {
              ...code(theme),
              wordBreak: 'break-all',
              flexBasis: '100%'
            },
            h4: {
              ...cardContainer(theme),
              ...heading(theme, {level: 6}),
              maxWidth: 'none',
              marginTop: '15px',
              marginBottom: 10,
              flexBasis: '100%'
            },
            'h4 code': {
              ...code(theme),
              wordBreak: 'break-all'
            },
            'h4 code:first-child': {
              ...code(theme),
              marginLeft: 0
            },
            p: {
              ...text(theme, {level: 2}),
              flexBasis: '100%'
            },
            'p > span': cardContainer(theme),
            section: {
              boxSizing: 'border-box',
              justifyContent: 'space-between',
              alignSelf: 'flex-start ',
              display: 'flex'
            },
            ...inlineElements(theme, {selector: 'p'}),
            ...inlineUlist(theme, {
              selector: 'ul',
              style: {
                ...cardContainer(theme),
                ...text(theme, {level: 2})
              }
            }),
            ...inlineOlist(theme, {
              selector: 'ol',
              style: {
                ...cardContainer(theme),
                ...text(theme, {level: 2})
              }
            }),
            ...inlineBlockquoteRules,
            'h1 + blockquote ~ blockquote p': {
              fontStyle: 'italic'
            },
            hr: {
              ...cardContainer(theme),
              border: 'none',
              margin: '0',
              height: 0,
              maxWidth: 'none',
              flexBasis: '100%'
            }
          }} />
        {children}
      </section>
    );
  }
}

Card.propTypes = {
  children: PropTypes.node
};

Card.contextTypes = {
  theme: PropTypes.object.isRequired
};

export default Card;
