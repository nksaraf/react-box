import { motion } from 'framer-motion';
import { withThemedMotion } from './withThemedMotion';
import styled from 'styled-components';
import { Box } from './Box';
interface TextProps {
  variant?: string;
  center?: boolean;
}
export const Span = Box.withComponent(withThemedMotion(motion.span));

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
