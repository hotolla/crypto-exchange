import { Divider, Typography, Paper } from '@mui/material';

export const Footer = () => {
  return (
    <Paper square elevation={0} sx={{ backgroundColor: 'primary.main', p: 2 }}>
      <Divider/>
      <Typography variant="h6" align="center" color="primary.contrastText"> Crypto-exchange © 2023</Typography>
    </Paper>
  );
};