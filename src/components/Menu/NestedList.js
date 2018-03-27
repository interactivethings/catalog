import React from "react";
import { pagesShape } from "../../CatalogPropTypes";

import Link from "../Link/Link";
import ListItem, { style as listItemStyle } from "./ListItem";
import { style as menuStyle } from "./Menu";
import PropTypes from "prop-types";
import { css } from "../../emotion";

const NestedList = ({ theme, pages, title }, { router }) => {
  const collapsed = !pages
    .map(d => d.path && router.isActive(d.path))
    .filter(Boolean).length;

  const currentStyle = {
    ...menuStyle(theme),
    ...listItemStyle(theme)
  };

  return (
    <div>
      <Link
        to={pages[0].path}
        className={css({
          ...currentStyle.link,
          ...(collapsed ? {} : currentStyle.activeLink)
        })}
        activeStyle={{ ...currentStyle.link, ...currentStyle.activeLink }}
      >
        {title}
      </Link>
      {!collapsed && (
        <ul
          className={css({
            ...currentStyle.list,
            ...currentStyle.listNested,
            padding: 0
          })}
        >
          {pages
            .filter(page => !page.hideFromMenu)
            .map(page => (
              <ListItem key={page.id} page={page} nested theme={theme} />
            ))}
        </ul>
      )}
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

export default NestedList;
