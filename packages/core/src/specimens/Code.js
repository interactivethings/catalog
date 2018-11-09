import React from "react";
import { catalogShape } from "../CatalogPropTypes";
import { text } from "../styles/typography";
import PropTypes from "prop-types";
import { css } from "../emotion";
import Specimen from "../components/Specimen/Specimen";
import mapSpecimenOption from "../utils/mapSpecimenOption";
import HighlightedCode from "../components/HighlightedCode/HighlightedCode";

function getStyle(theme) {
  return {
    container: {
      ...text(theme, -0.5),
      boxSizing: "border-box",
      display: "block",
      width: "100%",
      background: "#fff",
      border: "1px solid #eee",
      color: theme.textColor,
      fontFamily: theme.fontMono,
      fontWeight: 400
    },
    toggle: {
      textDecoration: "underline",
      cursor: "pointer",
      marginBottom: 0,
      padding: 20,
      WebkitUserSelect: "none",
      userSelect: "none",
      background: "#eee"
    }
  };
}

class Code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSource: props.collapsed ? false : true
    };
  }

  render() {
    const {
      catalog: { theme },
      children,
      rawBody,
      collapsed,
      lang,
      raw
    } = this.props;
    const { viewSource } = this.state;
    const styles = getStyle(theme);

    const toggle = collapsed ? (
      <div
        className={css(styles.toggle)}
        onClick={() => this.setState({ viewSource: !viewSource })}
      >
        {viewSource ? "close" : "show example code"}
      </div>
    ) : null;

    const content = viewSource ? (
      <HighlightedCode
        language={lang}
        code={raw ? rawBody : children}
        theme={theme}
      />
    ) : null;

    return (
      <section className={css(styles.container)}>
        {toggle}
        {content}
      </section>
    );
  }
}

Code.propTypes = {
  children: PropTypes.string.isRequired,
  rawBody: PropTypes.string.isRequired,
  catalog: catalogShape.isRequired,
  collapsed: PropTypes.bool,
  lang: PropTypes.string,
  raw: PropTypes.bool
};

const mapOptionsToProps = mapSpecimenOption(/^lang-(\w+)$/, lang => ({ lang }));

const mapBodyToProps = (parsed, rawBody) => ({ ...parsed, rawBody });

export default Specimen(mapBodyToProps, mapOptionsToProps, {
  withChildren: true
})(Code);
