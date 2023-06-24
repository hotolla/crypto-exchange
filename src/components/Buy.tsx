import { Button, Grid, InputAdornment, MenuItem, OutlinedInputProps, TextField, Typography, styled } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { makeStyles } from '@mui/styles';
import { fetchExchangeRates } from "@/api/exchangeRates";

interface IProps {
  priceUsd: number,
};

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'PLN',
    label: 'zł',
  },
];

// const TextFieldComponent = styled(TextField)({
//   '& .css-jmo2kz-MuiInputBase-root-MuiInput-root:before': {
//     borderBottom: "none",
//   },
//   '& .css-jmo2kz-MuiInputBase-root-MuiInput-root:after': {
//     borderBottom: "none",
//   },
//   '& .css-jmo2kz-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before ': {
//     borderBottom: "none",
//   }
// });


const useStyles = makeStyles(() => ({
  input: {
    '& .css-jmo2kz-MuiInputBase-root-MuiInput-root:before': {
      borderBottom: "none",
    }
  }
}));

export const Buy = ({ priceUsd }: IProps) => {
	const [ currencyAmount, setCurrencyAmount ] = useState(20);
	const [ exchange, setExchange ] = useState('');
	const [ cryptoAmount, setCryptoAmount ] = useState(currencyAmount / priceUsd);
  const classes = useStyles();

  const handleCurrencyAmountChange = ({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
    setCurrencyAmount(+value);
    setCryptoAmount(+value / priceUsd);
  };

  const handleExchangeRateChange = ({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
    setExchange(value);
    console.log(value);
  };

  const exchangeValue = fetchExchangeRates();

  const exchangeRate = (value: string) => {
    if (value === exchange) {
      return exchangeValue
    }
  }

  return (
		<>
			<Grid
				noValidate
				container
				spacing={0}
				alignItems="center"
				direction="column"
				component="form"
			>
				<Grid item width={225}>
					<TextField
						margin="dense"
						name="Spend"
						label="Spend"
            onChange={handleCurrencyAmountChange}
            InputProps={{
              className: 'classes.input',
              endAdornment: (
              <InputAdornment position="start">
                
                {/* <TextFieldComponent
                  select
                  defaultValue="USD"
                  variant="standard"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextFieldComponent> */}
                
                <TextField
                  select
                  defaultValue="USD"
                  variant="standard"
                  //1
                  InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
                  // 2
                  // sx={{
                  //   '& .css-jmo2kz-MuiInputBase-root-MuiInput-root:before': {
                  //     borderBottom: "none",
                  //   },
                  // }}

                  //3
                  // className={classes.input}
                  onChange={handleExchangeRateChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                 {/* <Select
                  defaultValue="USD"
                  variant="standard"
                  disableUnderline
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select> */}
              </InputAdornment>
              )
            }}
					>
					</TextField>
				</Grid>

				<Grid item >
					<TextField
						margin="dense"
						name="Reseive"
						label="Reseive"
						placeholder="0 - 10000Currency"
            value={cryptoAmount}
					/>
				</Grid>

				<Grid item>
					<Button
						type="submit"
						variant="contained"
						size="large"
					>
						Buy
					</Button>
				</Grid>
		</Grid>
    <Typography textAlign={"center"} mt={2}>Расч. цена: 1 USD ≈ 0.914802 EUR</Typography>
	</>
	);
};