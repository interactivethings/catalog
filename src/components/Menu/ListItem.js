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
      ...baseLinkStyle,
      fontFamily: '"Open sans","Helvetica Neue",Helvetica,Arial,sans-serif;',
      fontSize: "12px",
      lineHeight: "16px",
      fontWeight: "700",
      borderTop: "none",
      color: theme.textColor,
      cursor: "pointer",
      display: "block",
      margin: "20px 16px",
      textDecoration: "none",
      "&:hover, &:active, &:focus": {
        ...baseLinkStyle,
        borderTop: "none",
        textDecoration: "underline",
        background: "rgba(255,255,255,0.1)"
      }
    },
    activeLink: {
      cursor: "pointer",
      margin: "32px 16px",
      "&:hover, &:active, &:focus": {
        ...baseLinkStyle,
        borderTop: "none",
        textDecoration: "underline",
        background: "none"
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
      margin: "0 16px 12px 28px",
      fontWeight: 400,
      "&:hover, &:active, &:focus": {
        ...baseLinkStyle,
        textDecoration: "underline",
        background: "rgba(255,255,255,0.1)"
      }
    },
    nestedActiveLink: {
      cursor: "pointer",
      fontWeight: 700,
      "&:hover, &:active, &:focus": {
        ...baseLinkStyle,
        textDecoration: "underline",
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
