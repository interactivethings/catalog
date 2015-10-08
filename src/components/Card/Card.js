import React, { Component, PropTypes } from 'react';
import { Style as RadiumStyle } from 'radium';
import {heading, text, inlineElements, inlineBlockquote} from 'scaffold/typography';
import {inlineUlist, inlineOlist } from 'scaffold/lists';

const cardContainer = () => ({maxWidth: 671});

class Card extends Component {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.object.isRequired
  }

  render() {
    const {theme, children} = this.props;

    let inlineBlockquoteRules = inlineBlockquote(theme);
    inlineBlockquoteRules.blockquote = {
      ...cardContainer(theme),
      ...inlineBlockquoteRules.blockquote
    };

    return (
      <section className='cg-Card' style={{
        background: theme.cardBackground,
        borderRadius: 3,
        boxShadow: theme.cardShadow ? `0px 1px 4px ${theme.lightColor}` : null,
        margin: `${theme.sizeL}px 0`,
        padding: `${theme.sizeXl}px ${theme.sizeL}px 14px ${theme.sizeL}px`,
        position: 'relative'
      }} >
        <RadiumStyle
          scopeSelector='.cg-Card >'
          rules={{
            h2: {
              ...cardContainer(theme),
              ...heading(theme, {level: 2})
            },
            h3: {
              ...cardContainer(theme),
              ...heading(theme, {level: 3})
            },
            h4: {
              ...cardContainer(theme),
              ...heading(theme, {level: 4})
            },
            p: {
              ...cardContainer(theme),
              ...text(theme, {level: 2})
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
              borderBottom: `1px solid ${theme.cardRuleColor}`,
              margin: '16px 0',
              height: 0
            }
          }} />
       {children}
      </section>
    );
  }
}

export default Card;
