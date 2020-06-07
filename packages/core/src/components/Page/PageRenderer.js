import PropTypes from "prop-types";
import "raf/polyfill";

import React, { PureComponent, useEffect } from "react";
import Page from "./Page";
import runscript from "../../utils/runscript";
import { useCatalog } from "../CatalogContext";
import { useRouter } from "../Router";

const renderStyles = (styles) => {
  return styles.map((src, i) => (
    <link key={i} href={src} rel="stylesheet" type="text/css" />
  ));
};

const renderContent = (Content) =>
  typeof Content === "string" ? <Page>{Content}</Page> : <Content />;

// eslint-disable-next-line react/display-name
const PageRenderer = React.memo(({ content }) => {
  const {
    page: { scripts, styles },
  } = useRouter();

  useEffect(() => {
    scripts.forEach(runscript);
  }, [scripts]);

  return (
    <div>
      {renderStyles(styles)}
      {renderContent(content)}
    </div>
  );
});

// class PageRenderer extends PureComponent {
//   constructor() {
//     super();
//     this.jump = this.jump.bind(this);
//     this.jumpTimeout = null;
//   }

//   componentDidMount() {
//     this.context.catalog.page.scripts.forEach(runscript);
//     // this.jump();
//   }

//   componentDidUpdate() {
//     this.context.catalog.page.scripts.forEach(runscript);
//     // this.jump();
//   }

//   componentWillUnmount() {
//     if (this.jumpTimeout !== null) {
//       cancelAnimationFrame(this.jumpTimeout);
//       this.jumpTimeout = null;
//     }
//   }

//   jump() {
//     const {
//       location: {
//         query: { a },
//         hash,
//       },
//     } = this.props;

//     // Hash is always defined, but may be an empty string. But the query param
//     // is indeed optional and may be undefined. We do not want to be jumping
//     // to the '#undefined' selector.

//     if (hash !== "") {
//       this.jumpToSelector(hash);
//     } else if (a !== undefined && a !== "") {
//       this.jumpToSelector(`#${a}`);
//     }
//   }

//   jumpToSelector(selector) {
//     if (this.jumpTimeout !== null) {
//       cancelAnimationFrame(this.jumpTimeout);
//       this.jumpTimeout = null;
//     }

//     // Don't freak out when hash is not a valid selector (e.g. #/foo)
//     try {
//       const el = document.querySelector(selector);
//       if (el) {
//         // Defer scrolling by one tick (when the page has completely rendered)
//         this.jumpTimeout = requestAnimationFrame(() => {
//           this.jumpTimeout = null;
//           el.scrollIntoView();
//         });
//       }
//     } catch (e) {
//       // eslint-disable-line no-empty
//     }
//   }

//   render() {
//     const { content } = this.props;
//     return (
//       <CatalogContext.Consumer>
//         {({
//           catalog: {
//             page: { styles },
//           },
//         }) => (
//           <div>
//             {renderStyles(styles)}
//             {renderContent(content)}
//           </div>
//         )}
//       </CatalogContext.Consumer>
//     );
//   }
// }

PageRenderer.propTypes = {
  content: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  location: PropTypes.object.isRequired,
};

export default PageRenderer;
