import { useCallback, useEffect, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import i18next from 'i18next';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { darkTheme, lightTheme } from '@/themes/themes';
import { Layout } from '@/components/Layout';
import createEmotionCache from '../themes/createEmotionCache';
import { AuthProvider } from '@/components/AuthProvider';
import { PrivateRoute } from '../modules/auth/PrivateRoute';
import { SessionProviders } from '@/components/SessionProviders';

const clientSideEmotionCache = createEmotionCache();
const isDarkThemeKey = 'isDarkTheme';
let item = false;

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps
}: AppProps & any) {
  const [ isDarkTheme, setIsDarkTheme ] = useState(item);
  const [ locale, setLocale ] = useState(i18next.language);

  const handleChangeTheme = useCallback(() => {
    setIsDarkTheme((isDarkTheme) => {
      if (typeof window !== 'undefined') localStorage.setItem(isDarkThemeKey, `${isDarkTheme}`);

      return !isDarkTheme;
    });
  }, [ isDarkTheme ]);

  useEffect(() => {
    item = localStorage.getItem(isDarkThemeKey) === 'false';
    // const handleLanguageChange = () => {
    //   setLocale(i18next.language);
    // };
    //
    // i18next.on('languageChanged', handleLanguageChange);

    // return () => {
    //   i18next.off('languageChanged', handleLanguageChange);
    // };
  }, []);
  
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <CssBaseline />

        <LocalizationProvider adapterLocale={locale}>
          <AuthProvider>
            {/*<PrivateRoute>*/}
            <SessionProviders>
              <Layout isDarkTheme={isDarkTheme} onThemeToggle={handleChangeTheme}>
                <Component {...pageProps} />
              </Layout>
            {/*</PrivateRoute>*/}
            </SessionProviders>
          </AuthProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};
