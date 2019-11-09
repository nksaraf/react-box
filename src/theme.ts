import colors from './color';
import Color from 'color';

const hue = colors.blueGrey;

function fontStack(fonts: string[]) {
  return fonts.map(font => (font.includes(' ') ? `"${font}"` : font)).join(', ');
}

const themeColors = {
  background: colors.white,
  text: hue[900],
  hue: hue,
  darkText: hue[900],
  lightText: colors.white,
  pageDivider: colors.red[200],
  // pageRule: colors.lightBlue[100],
  pageRule: Color(colors.blue[200])
    .lighten(0.25)
    .hex(),
  form: {
    active: hue[800],
    inactive: hue[200],
    disabled: hue[100],
    activeText: colors.white,
    inactiveText: hue[900],
    disabledText: hue[300]
  },
  primary: hue[800],
  light: hue[50],
  // accent: colors.lightBlue[300]
  accent: hue[300]
};

const other = {
  shadows: {
    none: 'rgba(0,0,0,0) 0 0px 0px 0',
    small: 'rgba(0,0,0,0.15) 0 3px 6px 0',
    large: 'rgba(0,0,0,0.30) 0 4px 10px 0'
  },
  ruleHeight: 32
};

export const theme = {
  breakpoints: ['544px', '768px', '1012px', '1280px'],
  colors: { ...colors, ...themeColors },
  fontSizes: [12, 14, 16, 20, 24, 32, 40, 48],
  lineHeights: {
    condensedUltra: 1,
    condensed: 1.25,
    default: 1.5
  },
  maxWidths: {
    small: '544px',
    medium: '768px',
    large: '1012px',
    xlarge: '1280px'
  },
  fonts: {
    normal: fontStack([
      'Barlow',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol'
    ]),
    mono: fontStack([
      'SFMono-Regular',
      'Consolas',
      'Liberation Mono',
      'Menlo',
      'Courier',
      'monospace'
    ])
  },
  fontWeights: {
    lighter: 300,
    normal: 400,
    bold: 500,
    bolder: 600
  },
  borders: [0, '1px solid'],
  radii: [0, 3, 6, 12, 150],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 64, 80, 96, 112, 128],
  sizes: [0, 4, 8, 16, 24, 32, 40, 48, 64, 80, 96, 112, 128],
  ...other
};

export default theme;


