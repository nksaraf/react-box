import { motion, MotionProps } from 'framer-motion';
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
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
  space,
  SpaceProps,
  typography,
  TypographyProps
} from 'styled-system';
import React from 'react';
import { withThemedMotion } from '../withThemedMotion';
import { TransformProps, transform } from './cssprops';
import { textVariant } from './textVariants';
import { CellProps, CustomGridProps, GridPosition, cellStyle, gridStyle } from './cssgrid';
import styled from 'styled-components';

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
