import React, { useMemo } from 'react';
import { useMedia } from 'react-use';
import { createTheme } from '@material-ui/core';

import { ThemeProvider as Provider } from '@material-ui/styles';

export const ThemeProvider = props => {
  const { children } = props;
  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    return createTheme({
      palette: { type: prefersDarkMode ? 'dark' : 'light' },
    });
  }, [prefersDarkMode]);

  return (
    <Provider theme={theme}>
      {children}
    </Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  ThemeProvider.displayName = 'ThemeProvider';
}
