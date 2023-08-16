import { useCallback, useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import i18next from 'i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { darkTheme, lightTheme } from '../themes/themes';
import { Layout } from '@/components/Layout';
import createEmotionCache from '../themes/createEmotionCache';

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
