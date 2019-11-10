import React from 'react';
import { ThemeProvider } from 'styled-components';

export default ({ theme, children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
