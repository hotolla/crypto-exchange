import { useForm, FormProvider } from 'react-hook-form';
import { Button, Typography, Stack, Container } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import * as authApi from '@/api/auth';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Yup } from '@/validation';
import { TextField } from '@/components/TextField';
import { preventDefault } from '@/helpers/preventDefault';

interface FormValues {
  name: string | null,
  email: string | null,
  password: string | null,
  confirmPassword: string | null
}

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const schema = Yup.object({
  name: Yup.string().nullable().required(),
  email: Yup.string().nullable().email().required(),
  password: Yup.string().nullable().required(),
  confirmPassword: Yup.string().nullable().required()
});

export const Registration = () => {
  const form = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const handleSubmit = (values: FormValues) => {
    authApi.register(values);
  };

  return (
    <Container maxWidth="xs">
      <FormProvider {...form}>

        <Stack sx={{ mt: 20, alignItems: 'center' }}>
        <Typography variant="h3" color="primary" mb={4}>
          Welcome to crypto exchange!
        </Typography>

        <HowToRegIcon color="primary" fontSize="large"/>

        <Typography variant="h5" color="primary" mt={1}>
          Registering an account:
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
            name="name"
            label="Name"
            placeholder="Enter name ..."
            variant="outlined"
          />

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

          <TextField
            required
            type="password"
            name="confirmPassword"
            label="Repeat password"
            placeholder="Enter password ..."
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            Register
          </Button>
      </Stack>
    </FormProvider>
    </Container>
  );
};
