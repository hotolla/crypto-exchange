import * as React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { CircularProgress, Paper, Typography } from '@mui/material';
import { ICurrency } from './currencies/types';

export const Currency = () => {
  const { query } = useRouter();
  const [ currency, setCurrency ] = useState<ICurrency | null>(null);
  
  useEffect(() => {
    if (!query.id) return;

    fetch(`https://api.coincap.io/v2/assets/${query.id}`)
      .then((response) => response.json())
      .then(({ data }: { data: ICurrency }) => {
        setCurrency(data);
      });
  }, [ query ]);

  return !currency? (
    <CircularProgress
      size={36}
      style={{ marginLeft: '50%', marginTop: 12 }}
    />
  ) : (
    <Paper>
      <Typography>
        {currency.name} course
      </Typography>

      <Typography>
        $ {currency.priceUsd} 
      </Typography>

      <Typography>
        {currency.changePercent24Hr} course
      </Typography>
    </Paper>
  )
}
