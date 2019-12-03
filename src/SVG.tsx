import ReactSVG from 'react-svg';
import { motion } from 'framer-motion';
import React from 'react';
import { withThemedMotion } from './withThemedMotion';
import { Box } from './Box';

const StyledSVG = Box.withComponent(withThemedMotion(motion.svg));

export function SVG({
  src = '',
  children = undefined as React.ReactNode,
  ...props
}) {
  if (src && src.length > 0) {
    return <ReactSVG style={{ stroke: 'currentColor', ...props }} src={src} />;
  } else {
    return <StyledSVG {...props}>{children as React.ReactNode}</StyledSVG>;
  }
}
SVG.defaultProps = {
  stroke: 'currentColor',
  // fill: 'currentColor'
};
