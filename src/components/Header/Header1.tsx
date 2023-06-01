import { AppBar, Button, Grid, IconButton, Switch, Toolbar, Typography, makeStyles } from '@mui/material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';

export interface Props {
  isDarkTheme: boolean,
  onThemeToggle: () => void,
}

// const useStyles = makeStyles(() => ({
//   root: {
//     display: 'flex',
//     marginBottom: 90
//   },
// }));

export const Header = ({ isDarkTheme, onThemeToggle }: Props) => {
  // const classes = useStyles();

  return (
    <AppBar position="fixed" >
      <Toolbar>
        <Grid container alignItems="center">

          <Grid item xs>
            <CurrencyBitcoinIcon />
            <Typography variant="h5" align="center">Cryptocurrency exchange</Typography>
          </Grid>

          <Grid item>
            <Switch checked={isDarkTheme} onChange={onThemeToggle} />
          </Grid> 
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
