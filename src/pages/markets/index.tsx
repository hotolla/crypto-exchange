import * as React from 'react';
import { Currencies } from '@/components/currencies/Currencies';
import { CurrenciesProvider } from '@/components/currencies/CurrenciesProvider';
import { Crypto } from '@/components/Crypto';

export default function Markets() {
  return (
    <CurrenciesProvider>
      <Currencies />
      {/* <Crypto/> */}
    </CurrenciesProvider>
  );
};
