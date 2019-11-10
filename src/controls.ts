import { motion } from 'framer-motion';
import { withThemedMotion } from './withThemedMotion';
import { Box } from './Box';

export const Image = Box.withComponent(withThemedMotion(motion.img));
export const Button = Box.withComponent(withThemedMotion(motion.button));
Button.defaultProps = {
  cursor: 'pointer'
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
