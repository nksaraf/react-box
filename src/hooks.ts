import React from 'react';
import { ThemeProvider, ThemeContext } from 'styled-components';
import Color from 'color';
import { get } from 'styled-system';

export const useTheme = () => {
  const base = React.useContext(ThemeContext);
  const theme = Object.assign(base as { [key: string]: any }, {
    get: (...keys) => get(base, ...keys),
    color: val => Color(get(base, `colors.${val}`))
  });

  return theme;
};

export { ThemeProvider } from 'styled-components';
export { useFormik } from 'formik';

