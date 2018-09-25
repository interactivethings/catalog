// TypeScript Version: 2.6
import * as React from "react";

// Configuration

// This union is kinda pointless because TS can't differentiate the two types well enough.
// Nontheless, it's nice as documentation ...
export type ConfigPageOrGroup = ConfigPage | ConfigPageGroup;

export interface ConfigPage {
  path: string;
  title: string;
  hideFromMenu?: boolean;
  imports?: { [key: string]: any };
  styles?: string[];
  scripts?: string[];
  content?: React.ComponentType;
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
  theme?: Partial<Theme>;
  logoSrc?: string;
  imports?: { [key: string]: any };
  styles?: string[];
  scripts?: string[];
}

export interface Theme {
  background: string;
  textColor: string;
  codeColor: string;
  linkColor: string;
  lightColor: string;
  pageHeadingBackground: string;
  pageHeadingTextColor: string;
  pageHeadingHeight: number;
  navBarBackground: string;
  navBarTextColor: string;
  brandColor: string;
  sidebarColor: string;
  sidebarColorActive: string;
  sidebarColorText: string;
  sidebarColorTextActive: string;
  sidebarColorLine: string;
  sidebarColorHeading: string;
  bgLight: string;
  bgDark: string;
  codeStyles: { [key: string]: { [key: string]: string } };
  checkerboardPatternLight: string;
  checkerboardPatternDark: string;
  fontFamily: string;
  fontHeading: string;
  fontMono: string;
  baseFontSize: number;
  msRatio: number;
}

export const DefaultTheme: Theme;
export const DefaultResponsiveSizes: ConfigResponsiveSize[];

// Functions

export function render(config: Config, element: HTMLElement): void;
export function configure(config: Config): any;
export function configureRoutes(config: Config): any;
export function configureJSXRoutes(config: Config): any;

export function pageLoader(
  f: string | (() => Promise<{ default: React.ComponentType }>) | (() => Promise<React.ComponentType>)
): React.ComponentType;

// Components

export class Catalog extends React.Component<Config> {}
export class Page extends React.Component {}
export function markdown(
  strings: TemplateStringsArray,
  ...interpolations: any[]
): JSX.Element;

// Specimens

export interface SpecimenProps {
  span?: 1 | 2 | 3 | 4 | 5 | 6;
  rawBody?: string;
  rawOptions?: string;
}

export interface AudioSpecimenProps {
  src: string;
  title?: string;
  loop?: boolean;
  autoplay?: boolean;
}
export class AudioSpecimen extends React.Component<
  SpecimenProps & AudioSpecimenProps
> {}

export interface CodeSpecimenProps {
  collapsed?: boolean;
  lang?: string;
  raw?: boolean;
}
export class CodeSpecimen extends React.Component<
  SpecimenProps & CodeSpecimenProps
> {}

export interface ColorSpecimenProps {
  value: string;
  name?: string | number;
}
export class ColorSpecimen extends React.Component<
  SpecimenProps & ColorSpecimenProps
> {}

export interface ColorPaletteSpecimenProps {
  colors: ColorSpecimenProps[];
  horizontal?: boolean;
}
export class ColorPaletteSpecimen extends React.Component<
  SpecimenProps & ColorPaletteSpecimenProps
> {}

export interface HintSpecimenProps {
  warning?: boolean;
  neutral?: boolean;
  important?: boolean;
  directive?: boolean;
}
export class HintSpecimen extends React.Component<
  SpecimenProps & HintSpecimenProps
> {}

export interface ImageSpecimenProps {
  src: string;
  title?: string;
  overlay?: string;
  description?: string;
  plain?: boolean;
  light?: boolean;
  dark?: boolean;
  scale?: boolean;
}
export class ImageSpecimen extends React.Component<
  SpecimenProps & ImageSpecimenProps
> {}

export interface TableSpecimenProps {
  columns?: string[];
  rows: { [key: string]: React.ReactNode }[];
}
export class TableSpecimen extends React.Component<
  SpecimenProps & TableSpecimenProps
> {}

export interface TypeSpecimenProps {
  color?: string;
  font: string;
  headings: string[] | number[];
  style?: string;
  weight: string;
}
export class TypeSpecimen extends React.Component<
  SpecimenProps & TypeSpecimenProps
> {}

export interface DownloadSpecimenProps {
  url: string;
  title?: string;
  subtitle?: string;
  filename?: string;
}
export class DownloadSpecimen extends React.Component<
  SpecimenProps & DownloadSpecimenProps
> {}

export interface HtmlSpecimenProps {
  children: string;
  noSource?: boolean;
  showSource?: boolean;
  plain?: boolean;
  light?: boolean;
  dark?: boolean;
  frame?: boolean;
  responsive?: boolean | string | string[];
}
export class HtmlSpecimen extends React.Component<
  SpecimenProps & HtmlSpecimenProps
> {}

export interface ReactSpecimenProps {
  children: React.ReactNode | string;
  noSource?: boolean;
  showSource?: boolean;
  plain?: boolean;
  light?: boolean;
  dark?: boolean;
  frame?: boolean;
  state?: any;
  responsive?: boolean | string | string[];
  sourceText?: string;
}
export class ReactSpecimen extends React.Component<
  SpecimenProps & ReactSpecimenProps
> {}

export interface VideoSpecimenProps {
  src: string;
  title?: string;
  muted?: boolean;
  loop?: boolean;
  autoplay?: boolean;
}
export class VideoSpecimen extends React.Component<
  SpecimenProps & VideoSpecimenProps
> {}
