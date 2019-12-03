import * as CSS from 'csstype';
import { ResponsiveValue, system } from 'styled-system';

export const transform = system({
  transform: true,
  transformBox: true,
  transformOrigin: true,
  transformStyle: true,
  translate: true,
  scale: true,
  rotate: true,
  perspective: true,
  perspectiveOrigin: true,
  overflow: true,
  boxSizing: true,
  cursor: true,
  textDecoration: true,
});

export interface TransformProps {
  transform?: ResponsiveValue<CSS.TransformProperty>;
  transformBox?: true;
  transformOrigin?: true;
  transformStyle?: true;
  translate?: true;
  scale?: true;
  rotate?: true;
  perspective?: true;
  perspectiveOrigin?: true;
  overflow?: ResponsiveValue<CSS.OverflowProperty>;
  boxSizing?: ResponsiveValue<CSS.BoxSizingProperty>;
  cursor?: ResponsiveValue<CSS.CursorProperty>;
  textDecoration?: ResponsiveValue<CSS.TextDecorationProperty<any>>;
}
