import { useCallback, useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { CacheProvider } from "@emotion/react";
import i18next from 'i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { darkTheme, lightTheme } from '../themes';
import { Layout } from '@/components/Layout';
import createEmotionCache from "../themes/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: AppProps & any) {
  const [ isDarkTheme, setIsDarkTheme ] = useState(false);
  const [ locale, setLocale ] = useState(i18next.language);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme((isDarkTheme) => !isDarkTheme);
  }, [ isDarkTheme ]);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLocale(i18next.language);
    };

    i18next.on('languageChanged', handleLanguageChange);

    return () => {
      i18next.off('languageChanged', handleLanguageChange);
    };
  }, []);
  
  console.log(process.env.REACT_APP_FREE_CURRENCY_API_KEY);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <LocalizationProvider adapterLocale={locale}>
        <Layout isDarkTheme={isDarkTheme} onThemeToggle={handleChangeTheme}>
          <Component {...pageProps} />
        </Layout>
      </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
