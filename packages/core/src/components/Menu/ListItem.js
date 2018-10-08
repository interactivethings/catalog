import PropTypes from "prop-types";
import React from "react";
import { css, cx } from "../../emotion";
import { pageShape, pagesShape } from "../../CatalogPropTypes";

import Link from "../Link/Link";
import { text } from "../../styles/typography";

const baseLinkStyle = {
  background: "none",
  border: "none",
  transition: "none"
};

const style = theme => {
  return {
    link: {
      ...text(theme),
      ...baseLinkStyle,
      borderTop: `1px solid ${theme.sidebarColorLine}`,
      color: theme.sidebarColorText,
      cursor: "pointer",
      display: "block",
      margin: 0,
      padding: "16px 40px",
      textDecoration: "none",
      "&:hover, &:active, &:focus": {
        ...baseLinkStyle,
        borderTop: `1px solid ${theme.sidebarColorLine}`,
        color: theme.sidebarColorTextActive,
        textDecoration: "none",
        background: "rgba(255,255,255,0.1)"
      }
    },
    activeLink: {
      color: theme.sidebarColorTextActive,
      cursor: "auto",
      padding: "16px 40px 8px 40px",
      "&:hover, &:active, &:focus": {
        ...baseLinkStyle,
        borderTop: `1px solid ${theme.sidebarColorLine}`,
        color: theme.sidebarColorTextActive,
        textDecoration: "none",
        background: "none"
      },
      "&:last-child": {
        padding: "16px 40px"
      }
    },
    listItem: {
      background: "none",
      margin: 0,
      padding: 0
    },
    nestedLink: {
      borderTop: "none",
      borderBottom: "none",
      padding: "8px 24px 8px 60px",
      "&:hover, &:active, &:focus": {
        ...baseLinkStyle,
        color: theme.sidebarColorTextActive,
        textDecoration: "none",
        background: "rgba(255,255,255,0.1)"
      }
    },
    nestedActiveLink: {
      color: theme.sidebarColorTextActive,
      cursor: "auto",
      "&:hover, &:active, &:focus": {
        ...baseLinkStyle,
        color: theme.sidebarColorTextActive,
        textDecoration: "none",
        background: "none"
      }
    },
    nestedList: {
      borderTop: "none",
      borderBottom: "none",
      display: "block",
      listStyle: "none",
      margin: 0,
      padding: "0 0 8px 0"
    },
    nestedListHidden: {
      display: "none"
    }
  };
};

const NestedList = ({ theme, pages, title }, { router }) => {
  const collapsed = !pages
    .map(d => d.path && router.isActive(d.path))
    .filter(Boolean).length;

  const currentStyle = style(theme);

  const linkStyle = cx(css(currentStyle.link), {
    [css(currentStyle.activeLink)]: !collapsed
  });

  const listStyle = cx(css(currentStyle.nestedList), {
    [css(currentStyle.nestedListHidden)]: collapsed
  });

  return (
    <div>
      <Link to={pages[0].path} className={linkStyle}>
        {title}
      </Link>
      <ul className={listStyle}>
        {pages
          .filter(page => !page.hideFromMenu)
          .map(page => (
            <ListItem key={page.id} page={page} nested theme={theme} />
          ))}
      </ul>
    </div>
  );
};

NestedList.propTypes = {
  pages: pagesShape.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

NestedList.contextTypes = {
  router: PropTypes.object.isRequired
};

class ListItem extends React.Component {
  render() {
    const { page, theme, nested } = this.props;
    const { path, pages, title, menuTitle } = page;

    const currentStyle = style(theme);

    const linkStyle = cx(css(currentStyle.link), {
      [css(currentStyle.nestedLink)]: nested
    });

    const activeLinkStyle = cx(linkStyle, {
      [css(currentStyle.activeLink)]: !nested,
      [css(currentStyle.nestedActiveLink)]: nested
    });

    return (
      <li className={css(currentStyle.listItem)}>
        {pages ? (
          <NestedList {...this.props} {...page} pages={pages} />
        ) : (
          <Link
            className={linkStyle}
            activeClassName={activeLinkStyle}
            to={path}
            onlyActiveOnIndex={path === "/"}
          >
            {menuTitle || title}
          </Link>
        )}
      </li>
    );
  }
}

ListItem.propTypes = {
  page: pageShape.isRequired,
  theme: PropTypes.object.isRequired,
  nested: PropTypes.bool
};

export default ListItem;
