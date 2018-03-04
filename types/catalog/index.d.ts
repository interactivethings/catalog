// TypeScript Version: 2.6
import * as React from "react";

// Configuration

// This union is kinda pointless because TS can't differentiate the two types well enough.
// Nontheless, it's nice as documentation ...
export type ConfigPageOrGroup = ConfigPage | ConfigPageGroup;

export interface ConfigPage {
  path: string;
  title: string;
  content?: () => React.ReactElement<Page>;
}

export interface ConfigPageGroup {
  title: string;
  pages: ConfigPage[];
}

export interface ConfigResponsiveSize {
  name: string;
  width: number;
  height: number;
}

export interface Config {
  title: string;
  pages: ConfigPageOrGroup[];

  useBrowserHistory?: boolean;
  basePath?: string;
  responsiveSizes?: ConfigResponsiveSize[];
  theme?: any;
  logoSrc?: string;
}

// Functions

export function render(config: Config, element: HTMLElement): void;
export function configure(config: any): any;
export function configureRoutes(config: any): any;
export function configureJSXRoutes(config: any): any;

export function pageLoader(f: string | (() => Promise<{default: () => React.ReactElement<Page>}>)): () => React.ReactElement<Page>;

// Components

export class Catalog extends React.Component<Config> {}
export class Page extends React.Component {}
export function markdown(strings: TemplateStringsArray, ...interpolations: any[]): React.ReactElement<Page>;

// Specimens

export interface SpecimenProps {
  span?: 1 | 2 | 3 | 4 | 5 | 6;
  rawBody?: string,
  rawOptions?: string
}

export class AudioSpecimen extends React.Component<SpecimenProps> {}

export interface CodeSpecimenProps {
  rawBody: string;
  collapsed: boolean;
  lang: string;
  raw: boolean;
}
export class CodeSpecimen extends React.Component<SpecimenProps & CodeSpecimenProps> {}

export interface ColorSpecimenProps {
  value: string;
  name: string;
}
export class ColorSpecimen extends React.Component<SpecimenProps & ColorSpecimenProps> {}

export interface ColorPaletteSpecimenProps {
  colors: Array<{name?: string, value: string}>;
  horizontal?: boolean;
}
export class ColorPaletteSpecimen extends React.Component<SpecimenProps & ColorPaletteSpecimenProps> {}

export class HtmlSpecimen extends React.Component<SpecimenProps> {}
export class HintSpecimen extends React.Component<SpecimenProps> {}
export class ImageSpecimen extends React.Component<SpecimenProps> {}

export interface TypeSpecimenProps {
  color?: string;
  font: string;
  headings: string[] | number[];
  style?: string;
  weight: string;
}
export class TypeSpecimen extends React.Component<SpecimenProps & TypeSpecimenProps> {}
export class DownloadSpecimen extends React.Component<SpecimenProps> {}

export interface ReactSpecimenProps {
  noSource?: boolean;
  plain?: boolean;
  light?: boolean;
  dark?: boolean;
  frame?: boolean;
  state?: any;
  responsive?: boolean | string | string[];
  sourceText?: string;
}
export class ReactSpecimen extends React.Component<SpecimenProps & ReactSpecimenProps> {}

export class VideoSpecimen extends React.Component<SpecimenProps> {}
