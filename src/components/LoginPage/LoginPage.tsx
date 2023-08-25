import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Container, Stack } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Yup } from '@/validation';
import * as authApi from '@/api/auth';
import { TextField } from '@/components/TextField';
import { preventDefault } from '@/helpers/preventDefault';

interface FormValues {
  email: string | null,
  password: string | null,
}

const defaultValues = {
  email: '',
  password: ''
};

const schema = Yup.object({
  email: Yup.string().nullable().required(),
  password: Yup.string().nullable().required()
});

export const LoginPage = () => {
  const [ isError, setIsError ] = useState(false);
  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    authApi.login(values)
      .catch(() => {
      setIsError(true);
    });
  };

  return (
    <Container maxWidth="xs">
      <FormProvider {...form}>

        <Stack sx={{ mt: 20, alignItems: 'center' }}>
          <Typography variant="h5" color="primary" mb={4}>
            Welcome to crypto exchange!
          </Typography>
          <LockOpenIcon  color="primary" fontSize="large"/>

          <Typography variant="h5" color="primary" mt={1}>
            Login to account:
          </Typography>
        </Stack>

        <Stack
          noValidate
          spacing={2}
          mt={4}
          component="form"
          onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
        >

          <TextField
            required
            type="email"
            name="email"
            label="E-mail address"
            placeholder="Enter e-mail ..."
          />

          <TextField
            required
            type="password"
            name="password"
            label="Password"
            placeholder="Enter password ..."
          />

          {isError &&
            <>
              <Typography align="center" color="error">
                Login details are not correct
              </Typography>
            </>
          }

          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Login
          </Button>

        </Stack>
      </FormProvider>
    </Container>
  );
};
