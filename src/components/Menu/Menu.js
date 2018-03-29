import PropTypes from "prop-types";
import React from "react";
import { css } from "../../emotion";
import { pagesShape } from "../../CatalogPropTypes";
import { heading, text, getFontSize } from "../../styles/typography";
import Link from "../Link/Link";

import ListItem from "./ListItem";

export function style(theme) {
  const logoBottomMargin = getFontSize(theme, 5);

  return {
    bar: {
      background: theme.sidebarColor,
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    },
    h1: {
      boxSizing: "border-box",
      margin: 0,
      padding: "21px 38px",
      height: theme.pageHeadingHeight,
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      fontSize: "1em"
    },
    title: {
      ...heading(theme, 1),
      color: theme.sidebarColorHeading,
      fontWeight: 700,
      marginBottom: logoBottomMargin,
      marginTop: 0
    },
    logo: {
      width: "100%",
      marginBottom: logoBottomMargin,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0 100%",
      flexGrow: 1
    },
    // Make it accessible to screen readers, hide visually, see http://webaim.org/techniques/css/invisiblecontent/#absolutepositioning
    logoTitle: {
      position: "absolute",
      left: "-10000px",
      top: "auto",
      width: "1px",
      height: "1px",
      overflow: "hidden"
    },
    list: {
      borderBottom: `1px solid ${theme.sidebarColorLine}`,
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    listNested: {
      borderTop: "none",
      borderBottom: "none",
      padding: "0 0 15px 40px"
    },
    info: {
      ...text(theme, -1),
      padding: 20,
      color: theme.lightColor
    },
    link: {
      color: theme.lightColor
    }
  };
}

class Menu extends React.Component {
  render() {
    const { theme, pageTree, logoSrc, title, basePath } = this.props;

    const currentStyle = style(theme);

    const titleString = title ? title : "";

    return (
      <div className={css(currentStyle.bar)}>
        <div className={css({ flexGrow: 1 })}>
          <Link to={basePath} className={css({ textDecoration: "none" })}>
            <h1 className={css(currentStyle.h1)}>
              {logoSrc ? (
                <div
                  className={css({
                    ...currentStyle.logo,
                    backgroundImage: `url("${logoSrc}")`
                  })}
                >
                  <span className={css(currentStyle.logoTitle)}>
                    {titleString}
                  </span>
                </div>
              ) : (
                <div className={css(currentStyle.title)}>{titleString}</div>
              )}
            </h1>
          </Link>
          <ul className={css(currentStyle.list)}>
            {pageTree
              .filter(page => !page.hideFromMenu)
              .map(page => (
                <ListItem key={page.id} page={page} theme={theme} />
              ))}
          </ul>
        </div>
        <div className={css(currentStyle.info)}>
          Powered by{" "}
          <a
            className={css(currentStyle.link)}
            href="https://www.catalog.style/"
            target="_blank"
          >
            Catalog
          </a>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  pageTree: pagesShape.isRequired,
  theme: PropTypes.object.isRequired,
  logoSrc: PropTypes.string,
  basePath: PropTypes.string,
  title: PropTypes.string
};

Menu.defaultProps = {
  styles: [],
  scripts: []
};

export default Menu;
