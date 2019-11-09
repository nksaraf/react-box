import * as CSS from 'csstype';
import styled, { ThemeContext, ThemeProvider } from 'styled-components';
import ReactSVG from 'react-svg';
import { motion, MotionProps } from 'framer-motion';
import Color from 'color';
import {
  background,
  BackgroundProps,
  border,
  BorderProps,
  color,
  ColorProps,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  grid,
  get,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  ResponsiveValue,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  system,
  typography,
  TypographyProps,
  variant
} from 'styled-system';
import React from 'react';

interface TransformProps {
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

const fromEntries = l => l.reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

const transform = system({
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
  textDecoration: true
});

interface CustomGridProps {
  flow?: any;
  minRowHeight?: any;
  areas?: any;
  columns?: any;
  rows?: any;
}

const frGetter = (value: string | number | undefined) =>
  typeof value === 'number' ? `repeat(${value}, 1fr)` : value;

const formatAreas = (areas: string[]) => areas;
// ? areas.map(area => `"${area}"`).join(' ') : "";

const gridStyle = system({
  flow: {
    property: 'gridAutoFlow'
  },
  minRowHeight: {
    property: 'gridAutoRows',
    transform: (value: any) => `minmax(${value || '20px'}, auto)`
  },
  areas: {
    property: 'gridTemplateAreas',
    transform: (value: any) => formatAreas(value)
  },
  columns: {
    property: 'gridTemplateColumns',
    transform: (value: any) => frGetter(value) as string
  },
  rows: {
    property: 'gridTemplateRows',
    transform: (value: any) => frGetter(value) as string
  }
});

interface CellProps {
  colIndex?: number | string;
  rowIndex?: number | string;
  colSpan?: number;
  rowSpan?: number;
  middle?: boolean;
  fullHeight?: boolean;
  fullWidth?: boolean;
}

const cellStyle = system({
  colSpan: {
    property: 'gridColumnEnd',
    transform: (value: any) => `${value !== undefined ? `span ${value || 1}` : ''}`
  },
  rowSpan: {
    property: 'gridRowEnd',
    transform: (value: any) => `${value !== undefined ? `span ${value || 1}` : ''}`
  },
  colIndex: {
    property: 'gridColumnStart',
    transform: (value: any) =>
      `${value !== undefined ? (typeof value === 'number' ? value + 1 : value) : ''}`
  },
  rowIndex: {
    property: 'gridRowStart',
    transform: (value: any) =>
      `${value !== undefined ? (typeof value === 'number' ? value + 1 : value) : ''}`
  }
});

interface GridPosition {
  row?: number;
  column?: number;
  rowSpan?: number;
  colSpan?: number;
}

const textVariant = variant({
  prop: 'textVariant',
  variants: {
    none: {},
    body: {
      fontSize: 1,
      fontWeight: 'normal'
    },
    h1: {
      as: 'h1',
      fontWeight: 'bolder',
      fontSize: 6
    },
    h2: {
      as: 'h2',
      fontWeight: 'bolder',
      fontSize: 5
    },
    h3: {
      as: 'h3',
      fontWeight: 'bolder',
      fontSize: 4
    },
    h4: {
      as: 'h4',
      fontWeight: 'bold',
      fontSize: 3
    },
    h5: {
      as: 'h5',
      fontWeight: 'bold',
      fontSize: 2
    },
    h6: {
      as: 'h6',
      fontWeight: 'bold',
      fontSize: 1
    },
    subhead: {
      fontWeight: 800,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontSize: 3
    }
  }
});

export interface BoxProps
  extends SpaceProps,
    ColorProps,
    DisplayProps,
    BackgroundProps,
    LayoutProps,
    FlexboxProps,
    GridProps,
    BorderProps,
    ShadowProps,
    PositionProps,
    TransformProps,
    TypographyProps,
    CellProps,
    CustomGridProps,
    MotionProps,
    React.RefAttributes<HTMLDivElement> {
  as?: any;
  gridPosition?: GridPosition;
  textVariant?: string;
  skipTheme?: boolean;
}

const applyTheme = (data: any, theme: any) => {
  if (data === undefined || typeof data === 'string' || Array.isArray(data)) {
    return data;
  } else if (typeof data === 'object') {
    return fromEntries(
      Object.entries(data).map(([k, v]: [string, any]) => [
        k,
        typeof v === 'string' ? v.replace(/\{([^}]+)\}/, (_, p1) => get(theme, p1)) : v
      ])
    );
  }
};

const applyThemeToVariants = (variants: any, theme: any) => {
  if (variants === undefined || typeof variants === 'string' || Array.isArray(variants)) {
    return variants;
  }
  return fromEntries(
    Object.entries(variants).map(([k, v]: [string, any]) => [k, applyTheme(v, theme)])
  );
};

export function withThemedMotion<T extends React.Component, P extends MotionProps = MotionProps>(
  WrappedComponent: React.ComponentType<P>
) {
  type Props = P & { skipTheme?: boolean };

  return React.forwardRef<T, Props>(
    (
      { animate, whileHover, variants, skipTheme = false, whileTap, ...props }: Props,
      ref: React.Ref<T>
    ) => {
      const theme = useTheme();
      return (
        <WrappedComponent
          ref={ref}
          animate={skipTheme ? animate : applyTheme(animate, theme)}
          whileHover={skipTheme ? whileHover : applyTheme(whileHover, theme)}
          whileTap={skipTheme ? whileTap : applyTheme(whileTap, theme)}
          variants={skipTheme ? variants : applyThemeToVariants(variants, theme)}
          {...(props as any)}
        />
      );
    }
  );
}

export const Box = styled(withThemedMotion(motion.div)).attrs<BoxProps>((props: BoxProps) => ({
  height: props.fullHeight ? '100%' : props.height,
  width: props.fullWidth ? '100%' : props.width,
  colIndex: props.gridPosition !== undefined ? props.gridPosition.column : props.colIndex,
  rowIndex: props.gridPosition !== undefined ? props.gridPosition.row : props.rowIndex,
  rowSpan: props.gridPosition !== undefined ? props.gridPosition.rowSpan : props.rowSpan,
  colSpan: props.gridPosition !== undefined ? props.gridPosition.colSpan : props.colSpan
}))<BoxProps>`
  ${space}
  ${color}
  ${display}
  ${layout}
  ${border}
  ${shadow}
  ${flexbox}
  ${grid}
  ${background}
  ${border}
  ${position}
  ${transform}
  ${typography}
  ${cellStyle}
  ${gridStyle}
  ${textVariant}
`;

Box.defaultProps = {
  boxSizing: 'border-box',
  fontSize: 1
};

export default Box;

export const Flex = styled(Box)`
  display: flex;
`;

export const Column = styled(Flex)`
  flex-direction: column;
`;

export const Row = styled(Flex)`
  flex-direction: row;
`;

export const Grid = styled(Box)`
  display: grid;
`;

Grid.defaultProps = {
  columns: 12,
  flow: 'row',
  gridGap: 2,
  minRowHeight: '20px'
};

export const Cell = styled(Box)``;

export const Span = Box.withComponent(withThemedMotion(motion.span));

export const Image = Box.withComponent(withThemedMotion(motion.img));

export const Button = Box.withComponent(withThemedMotion(motion.button));

Button.defaultProps = {
  cursor: 'pointer'
};

interface TextProps {
  variant?: string;
  center?: boolean;
}

export const Text = styled(Box.withComponent(withThemedMotion(motion.p))).attrs<TextProps>(
  ({ center, variant }) => ({
    textAlign: center ? 'center' : 'inherit',
    textVariant: variant
  })
)<TextProps>``;

Text.defaultProps = {
  margin: 0,
  display: 'inline-block',
  variant: 'none'
};

export const Link = Box.withComponent(withThemedMotion(motion.a));

Link.defaultProps = {
  display: 'inline-block',
  textDecoration: 'none',
  cursor: 'pointer'
};

export const Input = Box.withComponent(withThemedMotion(motion.input));

Input.defaultProps = {
  display: 'inline-block',
  verticalAlign: 'middle',
  type: 'text'
};

const StyledSVG = Box.withComponent(withThemedMotion(motion.svg));

export function SVG({ src = '', children = undefined as React.ReactNode, ...props }) {
  if (src && src.length > 0) {
    return <ReactSVG style={{ stroke: 'currentColor', ...props }} src={src} />;
  } else {
    return <StyledSVG {...props}>{children as React.ReactNode}</StyledSVG>;
  }
}

SVG.defaultProps = {
  stroke: 'currentColor'
  // fill: 'currentColor'
};

export const useTheme = () => {
  const base = React.useContext(ThemeContext);
  const theme = Object.assign(base as { [key: string]: any }, {
    get: (...keys) => get(base, ...keys),
    color: val => Color(get(base, `colors.${val}`))
  });

  return theme;
};

export { ThemeProvider };
