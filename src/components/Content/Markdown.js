import React from "react";
import styled from "../../styled";
import { text, getFontSize } from "../../styles/typography";
import { catalogShape } from "../../CatalogPropTypes";
import BaseLink from "../Link/Link";
import { css } from "../../emotion";

const baseListStyle = {
  width: "100%",
  marginLeft: 0,
  paddingLeft: "2rem"
};

// Defined with `css`, so it can be used as a selector for nested elements
// For example: `Paragraph`
const blockquoteStyle = css({
  quotes: "none",
  margin: "48px 0 32px 0",
  width: "100%",
  "&::before, &::after": { content: "none" },
  "& > :first-child": { marginTop: 0 },
  "& > :last-child": { marginBottom: 0 },
  "& + &": { marginTop: 0 }
});

export const Paragraph = styled("p", (props, { theme }) => ({
  ...text(theme),
  flexBasis: "100%",
  [`.${blockquoteStyle} &`]: { fontSize: getFontSize(theme, 1) },
  margin: `16px 0 0 0`
}));
export const UnorderedList = styled("ul", {
  ...baseListStyle,
  listStyle: "disc",
  marginTop: "16px",
  marginBottom: 0
});
export const OrderedList = styled("ol", {
  ...baseListStyle,
  listStyle: "ordinal",
  marginTop: "16px",
  marginBottom: 0
});
export const ListItem = styled("li", (props, { theme }) => ({
  ...text(theme),
  [`.${blockquoteStyle} &`]: { fontSize: getFontSize(theme, 1) },
  "& > :first-child": { marginTop: 0 },
  "& > :last-child": { marginBottom: 0 }
}));
export const BlockQuote = props => (
  <blockquote className={blockquoteStyle} {...props} />
);
export const Hr = styled("hr", {
  border: "none",
  flexBasis: "100%",
  margin: 0,
  height: 0
});
export const Em = styled("em", { fontStyle: "italic" });
export const Strong = styled("strong", {
  fontWeight: 700
});
export const CodeSpan = styled("code", (props, { theme }) => ({
  background: theme.bgLight,
  border: `1px solid #eee`,
  borderRadius: 1,
  display: "inline-block",
  fontFamily: theme.fontMono,
  fontSize: `${Math.pow(theme.msRatio, -0.5)}em`,
  lineHeight: 1,
  padding: "0.12em 0.2em",
  textIndent: 0
}));
export const Del = styled("del", {
  textDecoration: "line-through"
});
export const Image = styled("img", {
  maxWidth: "100%"
});

export const Link = (props, { catalog: { theme } }) => (
  <BaseLink
    className={css({
      color: theme.linkColor,
      textDecoration: "none",
      ":hover": { textDecoration: "underline" }
    })}
    {...props}
  />
);

Link.contextTypes = {
  catalog: catalogShape
};
