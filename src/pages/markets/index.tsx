import * as React from 'react';
import { Currencies } from '@/components/currencies/Currencies';
import { Provider } from 'react-redux'

export default function Markets() {
  return (
    <Provider store={store}>
      <Currencies />
    </Provider>
  );
};
