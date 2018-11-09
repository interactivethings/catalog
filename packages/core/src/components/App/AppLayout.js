import React from "react";
import PropTypes from "prop-types";
import { css, injectGlobal } from "../../emotion";
import { pageShape, pagesShape } from "../../CatalogPropTypes";
import NavigationBar from "./NavigationBar";
import PageHeader from "../Page/PageHeader";

const SIDEBAR_WIDTH = 251;
const SIDEBAR_ANIMATION_DURATION = 0.25;

injectGlobal`
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,700,400italic);
  @import url(https://fonts.googleapis.com/css?family=Roboto+Mono:400,700);

  body {
    margin: 0;
    padding: 0;
  }
`;

const MenuIcon = props => (
  <svg {...props} width="27px" height="20px" viewBox="0 0 27 20">
    <g fill="currentColor">
      <rect x="0" y="16" width="26" height="4" />
      <rect x="0" y="8" width="26" height="4" />
      <rect x="0" y="0" width="26" height="4" />
    </g>
  </svg>
);

const getStyles = (theme, sidebarVisible) => ({
  container: {
    margin: 0,
    padding: 0,
    width: "100%",
    height: "100%",
    position: "relative",
    // Use display: flex, so flexbox children aren't affected by IE's min-height bug
    // See https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items
    display: "flex"
  },
  menuIcon: {
    color: theme.pageHeadingTextColor,
    cursor: "pointer",
    height: 30,
    left: 20,
    position: "absolute",
    top: 20,
    width: 30
  },
  sideNav: {
    background: theme.sidebarColor,
    boxSizing: "content-box",
    color: "#fff",
    overflowY: "auto",
    position: "fixed",
    height: "100vh",
    width: SIDEBAR_WIDTH - 1,
    top: 0,
    left: 0,
    borderRight: `1px solid ${theme.sidebarColorLine}`,
    transform: `translateX(${sidebarVisible ? 0 : -SIDEBAR_WIDTH}px)`,
    transition: `transform ${SIDEBAR_ANIMATION_DURATION}s ease-in-out`,
    WebkitOverflowScrolling: "touch",
    "@media (min-width: 1000px)": {
      transform: `translateX(0px)`,
      transition: "none"
    }
  },
  navBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    opacity: sidebarVisible ? 1 : 0,
    visibility: sidebarVisible ? "visible" : "hidden",
    transition: `opacity ${SIDEBAR_ANIMATION_DURATION}s, visibility ${SIDEBAR_ANIMATION_DURATION}s`,
    "@media (min-width: 1000px)": {
      display: "none"
    }
  },
  content: {
    background: theme.background,
    boxSizing: "border-box",
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    flexDirection: "column",
    position: "relative",
    zIndex: 0, // To create a new stacking context, see #223.
    "@media (min-width: 1000px)": {
      paddingLeft: SIDEBAR_WIDTH
    }
  }
});

class AppLayout extends React.Component {
  constructor() {
    super();
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      sidebarVisible: false
    };
  }

  toggleSidebar(e) {
    e.preventDefault();
    this.setState({
      sidebarVisible: !this.state.sidebarVisible
    });
  }

  render() {
    const { sideNav, theme, pages, page } = this.props;
    const { sidebarVisible } = this.state;

    const styles = getStyles(theme, sidebarVisible);

    const nextPage = pages[page.index + 1];
    const previousPage = pages[page.index - 1];

    return (
      <div className={css(styles.container)}>
        <div className={css(styles.content)}>
          <PageHeader
            theme={theme}
            title={page.title}
            superTitle={page.superTitle}
          />
          <div className={css({ flexGrow: 1 })}>{this.props.children}</div>
          {!page.hideFromMenu && (
            <NavigationBar
              theme={theme}
              nextPage={nextPage}
              previousPage={previousPage}
            />
          )}
        </div>
        <MenuIcon
          className={css(styles.menuIcon)}
          onClick={this.toggleSidebar}
          onTouchEnd={this.toggleSidebar}
        />
        <div
          className={css(styles.navBackground)}
          onClick={this.toggleSidebar}
          onTouchEnd={this.toggleSidebar}
        />
        <div className={css(styles.sideNav)}>{sideNav}</div>
      </div>
    );
  }
}

AppLayout.propTypes = {
  sideNav: PropTypes.node,
  children: PropTypes.node,
  theme: PropTypes.object.isRequired,
  page: pageShape.isRequired,
  pages: pagesShape.isRequired
};

export default AppLayout;
