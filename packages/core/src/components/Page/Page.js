import React, { Component } from "react";
import PropTypes from "prop-types";
import renderMarkdown from "../../markdown/renderMarkdown";
import seqKey from "../../utils/seqKey";
import MarkdownSpecimen from "../Specimen/MarkdownSpecimen";
import { css } from "../../emotion";
import { useCatalog } from "../CatalogContext";

const pageStyle = {
  boxSizing: "border-box",
  margin: `0 20px 0 20px`,
  maxWidth: "64em",
  display: "flex",
  flexFlow: "row wrap",
  padding: `48px 0`,
  "@media (min-width: 640px)": {
    margin: `0 10px 0 20px`,
  },
  "@media (min-width: 1000px)": {
    margin: `0 30px 0 40px`,
  },
  "& > :first-child": {
    marginTop: 0,
  },
};

const Page = ({ children }) => {
  const {
    catalog: { getSpecimen },
  } = useCatalog();

  const getSpecimenKey = seqKey("Specimen");

  return (
    <div
      className={css({
        ...pageStyle,
      })}
    >
      {React.Children.map(children, (child) => {
        const md =
          typeof child === "string"
            ? renderMarkdown({
                text: child,
                renderer: {
                  // eslint-disable-next-line react/display-name
                  code: (body, options) => {
                    return (
                      <MarkdownSpecimen
                        key={getSpecimenKey()}
                        body={body}
                        options={options || ""}
                        getSpecimen={getSpecimen}
                      />
                    );
                  },
                },
              })
            : child;
        return md;
      })}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
