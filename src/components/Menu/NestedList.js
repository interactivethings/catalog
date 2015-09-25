import React, { PropTypes } from 'react';
import { State } from 'react-router';

import ListItem, { style as listItemStyle } from './ListItem';
import { style as menuStyle } from './Menu';
import Radium from 'radium';

const NestedList = React.createClass({
  mixins: [State],
  propTypes: {
    pages: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    theme: PropTypes.object.isRequired
  },
  getInitialState() {
    return {
      collapsed: false
    };
  },
  componentWillMount() {
    this.updateActiveState();
  },
  componentWillReceiveProps() {
    this.updateActiveState();
  },
  render() {
    const { theme, pages, title } = this.props;
    const { collapsed } = this.state;
    let currentStyle = {
      ...menuStyle(theme),
      ...listItemStyle(theme)
    };
    return (
      <div>
        <div style={[currentStyle.link, collapsed ? {} : currentStyle.nestedChildren]} onClick={this.toggleChildren}>{ title }</div>
        { !collapsed &&
          <ul style={[currentStyle.list, currentStyle.listNested]}>
            { pages.map(page => <ListItem key={page.name} {...page} nested theme={theme} />) }
          </ul>
        }
      </div>
    );
  },
  updateActiveState() {
    let hasActiveChild = this.props.pages
      .map((d) => this.isActive(d.name))
      .filter(Boolean)
      .length;

    this.setState({
      collapsed: !hasActiveChild
    });
  },
  toggleChildren() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
});

export default Radium(NestedList);
