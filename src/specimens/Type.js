import PropTypes from "prop-types";
import React from "react";
import { css } from "../emotion";
import { catalogShape } from "../CatalogPropTypes";
import Specimen from "../components/Specimen/Specimen";

function getStyle(theme) {
  return {
    container: {
      background: "#fff",
      width: "100%",
      textRendering: "initial",
      WebkitFontSmoothing: "initial",
      MozOsxFontSmoothing: "initial",
      display: "flex"
    },
    wrapper: {
      padding: `10px 20px`,
      boxSizing: "border-box",
      width: "100%"
    },
    title: {
      fontFamily: theme.fontMono,
      opacity: 0.4,
      margin: "10px 0"
    },
    heading: {
      maxWidth: "100%",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden"
    },
    kerning: {
      textRendering: "optimizeLegibility"
    },
    smoothing: {
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    },
    list: {
      listStyleType: "none",
      paddingLeft: 0,
      marginLeft: 0
    }
  };
}

const lorem = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim.`;
const kafka = `One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.`;

class Type extends React.Component {
  render() {
    const { catalog: { theme }, ...options } = this.props;
    const styles = getStyle(theme);

    // check if a shorter paragraph should is demanded
    const truncate = options.shorter ? 100 : null;
    // check if alternate dummy text is set
    const dummyText = options.kafka ? kafka : lorem;
    // check if the modifier demands kerning
    const kerning = options.kern ? styles.kerning : null;
    // check if the modifier demands font smoothing
    const smoothing = options.smoothen ? styles.smoothing : null;
    // Use single word or sentence for headlines
    const headlineText = options.single
      ? "Hamburgefonstiv"
      : "The quick brown fox jumps over the lazy dog";

    const fontColor = options.color ? { color: options.color } : null;
    const isItalic = options.style ? options.style : "normal";
    const fontFamily = options.font ? options.font : "inherit";
    const backgroundColor = options.background
      ? { backgroundColor: options.background }
      : null;
    const fontWeight = options.weight ? options.weight : "normal";
    const letterSpacing = options.tracking
      ? { letterSpacing: options.tracking }
      : null;
    const backgroundImage = options.image
      ? {
          backgroundImage: `url(${options.image})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }
      : null;

    const description = (
      <ul className={css({ ...styles.title, ...styles.list, ...fontColor })}>
        {options.color ? (
          <li className={css(styles.list)}>color: {options.color + ";"}</li>
        ) : null}
        {options.background ? (
          <li className={css(styles.list)}>
            background-color: {options.background + ";"}
          </li>
        ) : null}
        {fontWeight !== "normal" ? (
          <li className={css(styles.list)}>
            font-weight: {options.weight + ";"}
          </li>
        ) : null}
        {isItalic !== "normal" ? (
          <li className={css(styles.list)}>
            font-style: {options.style + ";"}
          </li>
        ) : null}
        {letterSpacing ? (
          <li className={css(styles.list)}>
            letter-spacing: {options.tracking + ";"}
          </li>
        ) : null}
      </ul>
    );

    const headings = options.headings
      ? options.headings.map((heading, i) => {
          const headingValue =
            heading !== null && typeof heading === "object"
              ? heading.value
              : heading;
          const headingLabel =
            heading !== null && typeof heading === "object"
              ? heading.label
              : "h" + (i + 1);
          const isPixel = typeof headingValue === "number" ? "px" : "";
          return (
            <div key={i}>
              <div className={css({ ...styles.title, ...fontColor })}>
                {headingLabel} ({headingValue + isPixel})
              </div>
              <div
                className={css({
                  ...styles.heading,
                  ...letterSpacing,
                  font: `${isItalic} normal ${fontWeight} ${headingValue +
                    isPixel} ${fontFamily}`
                })}
              >
                {headlineText}
              </div>
            </div>
          );
        })
      : null;

    const paragraphs = options.paragraphs
      ? options.paragraphs.map((paragraph, i) => {
          const paragraphValue =
            paragraph !== null && typeof paragraph === "object"
              ? paragraph.value
              : paragraph;
          const paragraphLabel =
            paragraph !== null && typeof paragraph === "object"
              ? paragraph.label
              : "Paragraph";

          const values = paragraphValue
            .split("/")
            .map(item => {
              return /[a-z]/i.test(item) ? `${item}` : `${item}px`;
            })
            .join("/");
          return (
            <div key={i}>
              <div className={css({ ...styles.title, ...fontColor })}>
                {paragraphLabel} ({values})
              </div>
              <div
                className={css({
                  ...styles.paragraph,
                  ...letterSpacing,
                  font: `${isItalic} normal ${fontWeight} ${values} ${fontFamily}`
                })}
              >
                {truncate ? `${dummyText.substring(0, 200)}…` : dummyText}
              </div>
            </div>
          );
        })
      : null;

    return (
      <section className={css(styles.container)}>
        <div
          className={css({
            ...styles.wrapper,
            ...kerning,
            ...smoothing,
            ...fontColor,
            ...backgroundColor,
            ...backgroundImage
          })}
        >
          {headings}
          {headings && paragraphs ? <br /> : null}
          {paragraphs}
          {description}
        </div>
      </section>
    );
  }
}

Type.propTypes = {
  shorter: PropTypes.bool,
  kafka: PropTypes.bool,
  kern: PropTypes.bool,
  smoothen: PropTypes.bool,
  single: PropTypes.bool,
  color: PropTypes.string,
  style: PropTypes.string,
  font: PropTypes.string,
  background: PropTypes.string,
  weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tracking: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  headings: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    ])
  ),
  paragraphs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    ])
  ),
  catalog: catalogShape.isRequired
};

export default Specimen()(Type);
