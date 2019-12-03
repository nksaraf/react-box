import { variant } from 'styled-system';

export const textVariant = variant({
  prop: 'textVariant',
  variants: {
    none: {},
    body: {
      fontSize: 1,
      fontWeight: 'normal',
    },
    h1: {
      as: 'h1',
      fontWeight: 'bolder',
      fontSize: 6,
    },
    h2: {
      as: 'h2',
      fontWeight: 'bolder',
      fontSize: 5,
    },
    h3: {
      as: 'h3',
      fontWeight: 'bolder',
      fontSize: 4,
    },
    h4: {
      as: 'h4',
      fontWeight: 'bold',
      fontSize: 3,
    },
    h5: {
      as: 'h5',
      fontWeight: 'bold',
      fontSize: 2,
    },
    h6: {
      as: 'h6',
      fontWeight: 'bold',
      fontSize: 1,
    },
    subhead: {
      fontWeight: 800,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontSize: 3,
    },
  },
});
