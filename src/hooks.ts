import React from 'react';
import { ThemeContext } from 'styled-components';
import Color from 'color';
import { get } from 'styled-system';

export const useTheme = () => {
  const base = React.useContext(ThemeContext);
  const theme = Object.assign(base as { [key: string]: any }, {
    get: (...keys: string[]) => get(base, ...keys),
    color: (val: string) => Color(get(base, `colors.${val}`)),
  });

  return theme;
};

export * from 'react-use';
