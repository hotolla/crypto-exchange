import * as React from 'react';
import { Currencies } from '@/components/currencies/Currencies';
import { CurrenciesProvider } from '@/components/currencies/CurrenciesProvider';

export default function Markets() {
  return (
    <CurrenciesProvider>
      <Currencies />
    </CurrenciesProvider>
  );
};
