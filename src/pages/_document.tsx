import { Html, Head, Main, NextScript } from 'next/document';
import { initI18n } from '../components/i18n';
import { useEffect } from 'react';

export default function Document() {
  useEffect(() => {
    initI18n();
    console.log('es');
    
  }, []);

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
