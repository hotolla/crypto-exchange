import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import { Box, Button, CircularProgress } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/router';
import { ICurrency, ICurrencyHistory, ICurrencyState } from './currencies/types';
import { changePercent } from '@/helpers/changePercent';
import { initialState } from './currencies/CurrenciesProvider/initialState';
import { CryptoChart } from './СryptoСhart';
import { fetchCurrency, fetchCurrencyCandles } from '@/api/currencies';
import { timeParse } from "d3-time-format";
import { Buy } from './Buy';

const columns = [
  { field: 'symbol', headerName: 'Symbol', width: 80, cellClassName: 'symbol' },
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
    renderCell: (currency: any) => 
    <Link href={`/markets/${currency.id}`} color='info.main'><Button>Buy</Button></Link>,
  },
];

export const CurrencyDataGrid = () => {
  const { query } = useRouter();
  const [ currency, setCurrency ] = useState<ICurrency | null>(null);
  const [ history, setHistory ] = useState<ICurrencyHistory[] | null>(null);

  // useEffect(() => {
  //   if (!query.id) return;

  //   fetch(`https://api.coincap.io/v2/assets/${query.id}`)
  //     .then((response) => response.json())
  //     .then(({ data }: { data: ICurrency }) => {
  //       setCurrency(data);
  //     });
    
    // fetchCurrencyCandles(query.id.toString())
    //   .then(( data : ICurrencyHistory [] ) => {
    //     setHistory(data.map(([ date, open, high, low, close ] : any) => ({
    //       date: new Date(date),
    //       open,
    //       high,
    //       low,
    //       close,
    //       volume: 0
    //     })));
    //   });
  // }, [ query ])

    useEffect(() => {
      if (!query.id) return;

      fetchCurrency(query.id.toString())
        .then(({ data }: { data: ICurrency }) => {
          setCurrency(data);
        });
    
    fetchCurrencyCandles(query.id.toString())
      .then(( data : ICurrencyHistory [] ) => {
        setHistory(data.map(([ date, open, high, low, close ] : any) => ({
          date: new Date(date),
          open,
          high,
          low,
          close,
          volume: 0
        })));
      });
  }, [ query ]);

  return !currency ? (
    <CircularProgress
      size={36}
      style={{ marginLeft: '50%', marginTop: 12 }}
    />
  ) : (
    <Box 
      sx={{
        width: '45%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 4,
        marginBottom: 4,
        '& .color.negative': {
          color: 'error.main',
        },
        '& .color.positive': {
          color: 'success.main',
        },
        '& .symbol': {
          fontWeight: 'bold',
        },
      }}
    >
      <DataGrid
        hideFooterPagination
        hideFooter
        rows={[ currency ]}
        columns={columns}
        disableRowSelectionOnClick
        slotProps={{
          baseCheckbox: {
            icon: <StarBorderIcon />,
            checkedIcon: <StarIcon />
          },
        }
      }
      />
      
      {!history ? (
        <CircularProgress
          size={36}
          style={{ marginLeft: '50%', marginTop: 12 }}
        />
      ) : (
        <CryptoChart data={history} />
      )}
      <Buy priceUsd={+currency.priceUsd}/>
    </Box>
  );
}
