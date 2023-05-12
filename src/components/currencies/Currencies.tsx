import * as React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useState, useEffect, useContext } from 'react';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { changePercent } from '../../helpers/changePercent';
import { CurrenciesContext, CurrenciesProvider } from './CurrenciesProvider';
import { ICurrency } from './types';

const columns = [
  { field: 'symbol', headerName: 'Symbol', width: 80, cellClassName: 'symbol',
    renderCell: (currencies: any) => 
    <Link href={`/markets/${currencies.id}`}>{currencies.id}</Link>,
  } ,
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'priceUsd', headerName: 'Price USD', width: 140 },
  { 
    field: 'changePercent24Hr',
    headerName: 'Change 24Hr, %',
    width: 120,
    valueFormatter: (params: GridValueFormatterParams) => changePercent (params),
    cellClassName: (params: any) => {
      if (params.value == null) {
        return '';
      }

      return clsx('color', {
        negative: params.value < 0,
        positive: params.value > 0,
      });
    },
  },
  { field: 'volumeUsd24Hr', headerName: 'Volume Usd 24Hr', width: 120 },
  { field: 'marketCapUsd', headerName: 'market capital. Usd', width: 120 },
  {
    field: 'Buy',
    headerName: '',
    width: 80,
    renderCell: (currencies: any) => 
    <Link href={`/markets/${currencies.id}`}><Button>More</Button></Link>,
  },
];

export const Currencies = () => {
  const { currencies, fetchCurrencies } = useContext(CurrenciesContext);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCurrencies();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box 
    sx={{
      width: '100%',
      marginLeft: 8,
      '& .color.negative': {
        color: 'red',
      },
      '& .color.positive': {
        color: 'green',
      },
      '& .symbol': {
        fontWeight: 'bold',
      },

    }}
    >
      <DataGrid
        checkboxSelection
        rows={currencies}
        columns={columns}
        disableRowSelectionOnClick
        slotProps={{
          baseCheckbox: {
            icon: <FavoriteBorder />,
            checkedIcon: <Favorite />
          },
        }}
      />
    </Box>
  );
}
