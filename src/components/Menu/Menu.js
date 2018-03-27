import PropTypes from "prop-types";
import React from "react";
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
    search: {
      ...text(theme),
      border: "none",
      width: "100%",
      padding: "16px 16px 16px 40px",
      borderTop: `1px solid ${theme.sidebarColorLine}`,
      outline: "none",
      ":focus": {
        outline: "none"
      }
    },
    h1: {
      boxSizing: "border-box",
      margin: 0,
      padding: "21px 38px",
      height: theme.pageHeadingHeight,
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column"
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
  constructor() {
    super();
    this.state = {
      filterString: "",
      filteredPages: []
    };
  }

  setFilterString(e) {
    const filterString = e.target.value;
    this.props.runSearch(filterString).then(matches => {
      this.setState({
        filteredPages: matches
      });
    });
    this.setState({
      filterString: filterString
    });
  }

  resetFilterString() {
    this.setState({
      filterString: ""
    });
  }

  render() {
    const { theme, pageTree, logoSrc, title, basePath } = this.props;
    const { filterString, filteredPages } = this.state;

    const currentStyle = style(theme);

    const titleString = title ? title : "";

    const logo = logoSrc ? (
      <div
        style={{ ...currentStyle.logo, backgroundImage: `url("${logoSrc}")` }}
      >
        <span style={currentStyle.logoTitle}>{titleString}</span>
      </div>
    ) : (
      <div style={currentStyle.title}>{titleString}</div>
    );

    const pages = filterString
      ? filteredPages.map(page => (
          <ListItem key={page.id} page={page} theme={theme} />
        ))
      : pageTree
          .filter(page => !page.hideFromMenu)
          .map(page => <ListItem key={page.id} page={page} theme={theme} />);

    return (
      <div style={currentStyle.bar}>
        <div style={{ flexGrow: 1 }}>
          <Link to={basePath} style={{ textDecoration: "none" }}>
            <h1 style={currentStyle.h1}>{logo}</h1>
          </Link>
          <input
            style={currentStyle.search}
            placeholder="Filter pages"
            type="search"
            value={filterString}
            onChange={e => this.setFilterString(e)}
          />
          <ul
            style={currentStyle.list}
            onClick={() => this.resetFilterString()}
          >
            {pages}
          </ul>
        </div>
        <div style={currentStyle.info}>
          Powered by{" "}
          <a
            style={currentStyle.link}
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
  runSearch: PropTypes.func.isRequired,
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
