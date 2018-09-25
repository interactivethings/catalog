// Configuration
export { default as render } from "./render";
export { default as configure } from "./configure";
export { default as configureRoutes } from "./configureRoutes";
export { configureJSXRoutes } from "./configureRoutes";
export { default as markdown } from "./markdownPage";
export { default as pageLoader } from "./pageLoader";
export { default as DefaultTheme } from "./DefaultTheme";
export { default as DefaultResponsiveSizes } from "./DefaultResponsiveSizes";

// Components
export { default as Catalog } from "./components/Catalog";
export { default as Card } from "./components/Card/Card";
export { default as Page } from "./components/Page/Page";
export { default as Span } from "./components/Specimen/Span";

// Export for use in loader
export { default as PageRenderer } from "./components/Page/PageRenderer";

// Higher-order component for creating specimens
export { default as Specimen } from "./components/Specimen/Specimen";
export { default as mapSpecimenOption } from "./utils/mapSpecimenOption";

// Specimens
export { default as AudioSpecimen } from "./specimens/Audio";
export { default as CodeSpecimen } from "./specimens/Code";
export { default as ColorSpecimen } from "./specimens/Color";
export { default as ColorPaletteSpecimen } from "./specimens/ColorPalette";
export { default as HtmlSpecimen } from "./specimens/Html";
export { default as HintSpecimen } from "./specimens/Hint";
export { default as ImageSpecimen } from "./specimens/Image";
export { default as TableSpecimen } from "./specimens/Table";
export { default as TypeSpecimen } from "./specimens/Type";
export { default as DownloadSpecimen } from "./specimens/Download";
export {
  default as ReactSpecimen
} from "./specimens/ReactSpecimen/ReactSpecimen";
export { default as VideoSpecimen } from "./specimens/Video";
