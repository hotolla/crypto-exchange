import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { ICurrency } from './types';

const columns = [
  { field: 'symbol', headerName: 'Symbol', width: 80 },
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'priceUsd', headerName: 'Price USD', width: 140 },
  { field: 'changePercent24Hr', headerName: 'Change 24Hr, %', width: 120 },
  { field: 'volumeUsd24Hr', headerName: 'Volume Usd 24Hr', width: 120 },
  { field: 'marketCapUsd', headerName: 'market capital. Usd', width: 120 },
];

export default function Currencies() {
  const [ currencies, setCurrencies ] = useState<ICurrency[]>([]);

  useEffect(() => {
    fetch('https://api.coincap.io/v2/assets')
      .then((response) => response.json())
      .then(({ data }: { data: ICurrency[] }) => {
        setCurrencies(data.map(({
          id,
          symbol,
          name,
          priceUsd,
          changePercent24Hr,
          volumeUsd24Hr,
          marketCapUsd
        }) => ({
          id,
          symbol,
          name,
          priceUsd,
          changePercent24Hr,
          volumeUsd24Hr,
          marketCapUsd
        })));
      });
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        checkboxSelection
        rows={currencies}
        columns={columns}
        paginationModel={{ page: 0, pageSize: 5 }}
      />
    </div>
  );
}
