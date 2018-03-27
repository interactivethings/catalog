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

export const Paragraph = styled("p", (props, { theme }) => ({
  ...text(theme),
  flexBasis: "100%",
  margin: `16px 0 0 0`
}));
export const UnorderedList = styled("ul", (props, { theme }) => ({
  ...baseListStyle,
  ...text(theme),
  listStyle: "disc",
  marginTop: "16px",
  marginBottom: 0
}));
export const OrderedList = styled("ol", (props, { theme }) => ({
  ...baseListStyle,
  ...text(theme),
  listStyle: "ordinal",
  marginTop: "16px",
  marginBottom: 0
}));
export const ListItem = styled("li", (props, { theme }) => ({
  ...text(theme),
  "& > :first-child": { marginTop: 0 },
  "& > :last-child": { marginBottom: 0 }
}));
export const BlockQuote = styled("blockquote", (props, { theme }) => ({
  fontSize: getFontSize(theme, 1),
  quotes: "none",
  margin: "48px 0 32px 0",
  "&::before, &::after": { content: "none" },
  "& > :first-child": { marginTop: 0 },
  "& > :last-child": { marginBottom: 0 },
  "+ blockquote": { marginBottom: 0 }
}));
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
export const Del = styled("del", (props, { theme }) => text(theme));
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
