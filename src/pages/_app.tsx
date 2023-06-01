import '@/styles/globals.css';
import { useCallback, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app'
import { darkTheme, lightTheme } from '../themes/themes';
import { Layout } from '@/components/Layout';
import createEmotionCache from "../themes/createEmotionCache";
import { CacheProvider } from "@emotion/react";

// const isDarkThemeKey = 'isDarkTheme';
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: AppProps & any) {
  const [ isDarkTheme, setIsDarkTheme ] = useState(false);

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme(!isDarkTheme);
  }, [ isDarkTheme ]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />
        <Layout isDarkTheme={isDarkTheme} onThemeToggle={handleChangeTheme}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
};
