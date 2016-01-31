const mergeSpecimens = (config, specimens) => ({...config, specimens: {...specimens, ...config.specimens}});

// Configuration
import specimens from './specimens';
import {default as _render} from './render';
import {default as _configure} from './configure';
import {default as _configureRoutes} from './configureRoutes';
import {configureJSXRoutes as _configureJSXRoutes} from './configureRoutes';

export const render = (config, element) => {
  _render(mergeSpecimens(config, specimens), element);
};
export const configure = (config) => {
  _configure(mergeSpecimens(config, specimens));
};
export const configureRoutes = (config) => {
  _configureRoutes(mergeSpecimens(config, specimens));
};
export const configureJSXRoutes = (config) => {
  _configureJSXRoutes(mergeSpecimens(config, specimens));
};

// Components
export {default as Card} from './components/Card/Card';
export {default as Page} from './components/Page/Page';
export {default as Span} from './components/Specimen/Span';

// Higher-order component for creating specimens
export {default as Specimen} from './components/Specimen/Specimen';
export {default as mapSpecimenOption} from './utils/mapSpecimenOption'; 

// Specimens
export {default as AudioSpecimen} from './specimens/Audio';
export {default as CodeSpecimen} from './specimens/Code';
export {default as ColorSpecimen} from './specimens/Color';
export {default as ColorPaletteSpecimen} from './specimens/ColorPalette';
export {default as HtmlSpecimen} from './specimens/Html';
export {default as HintSpecimen} from './specimens/Hint';
export {default as ImageSpecimen} from './specimens/Image';
export {default as TypeSpecimen} from './specimens/Type';
export {default as DownloadSpecimen} from './specimens/Download';
export {default as ReactSpecimen} from './specimens/ReactSpecimen/ReactSpecimen';
export {default as VideoSpecimen} from './specimens/Video';
