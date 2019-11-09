import React from 'react';
import { ThemeProvider } from 'styled-components';

export default ({ theme, children }) => {
  console.log(theme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
