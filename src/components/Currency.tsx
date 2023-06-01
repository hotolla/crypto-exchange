import * as React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { ICurrency } from './currencies/types';
import { fetchCurrency } from '@/api/currencies';

export const Currency = () => {
  const { query } = useRouter();
  const [ currency, setCurrency ] = useState<ICurrency | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!query.id) return;

      fetchCurrency(query.id.toString())
        .then(({ data }: { data: ICurrency }) => {
          setCurrency(data);
        });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [ query ]);

  return !currency? (
    <CircularProgress
      size={36}
      style={{ marginLeft: '50%', marginTop: 12 }}
    />
  ) : (
    <Grid container spacing={2}>
      <Grid item>
        <Typography>
          {currency.name} course
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          $ {currency.priceUsd} 
        </Typography>
      </Grid>

      <Grid item>
        <Typography>
          {currency.changePercent24Hr} changePercent24Hr
        </Typography>
      </Grid>

      <Grid item>
        <Typography>
          {currency.marketCapUsd} marketCapUsd
        </Typography>
      </Grid>
    </Grid>
  );
};
