import { preventDefault } from "@/helpers/preventDefault";
import { Button, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { number } from "prop-types";
import { ChangeEvent, useState } from "react";

interface IProps {
  priceUsd: number,
}

export const Buy = ({ priceUsd }: IProps) => {
	const [ currencyAmount, setCurrencyAmount ] = useState(20);
	const [ cryptoAmount, setCryptoAmount ] = useState(currencyAmount / priceUsd);

	// const handleSubmit = () => {
  //   setCryptoAmount(buy);
  // };
  const handleCurrencyAmountChange = ({ target: { value }}: ChangeEvent<HTMLInputElement>) => {
    setCurrencyAmount(+value);
    setCryptoAmount(+value / priceUsd);
  };

  return (
		<>
			<Grid
				noValidate
				container
				spacing={0}
				alignItems="center"
				direction="column"
				component="form"
				// onSubmit={preventDefault(handleSubmit(event?.target))}
			>
				<Grid item >
					<TextField
						margin="dense"
						name="Spend"
						label="Spend"
						placeholder="USD"
            value={currencyAmount}
            onChange={handleCurrencyAmountChange}
					/>
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

			{/* <Grid item >
				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel>Spend</InputLabel>
					<OutlinedInput
						endAdornment={<InputAdornment position="end">USD</InputAdornment>}
						label="Amount"
					/>
				</FormControl>
			</Grid>

			<Grid item >
				<FormControl fullWidth sx={{ m: 1 }}>
					<InputLabel>Receive</InputLabel>
					<OutlinedInput
						endAdornment={<InputAdornment position="end">Currency</InputAdornment>}
						label="Amount"
					/>
				</FormControl>
			</Grid>

			<Grid item >
				<Button
					type="submit"
					variant="contained"
					size="large"
				>
					Buy
				</Button>
			</Grid> */}
		</Grid>
	</>
	);
};