import { useForm, FormProvider } from 'react-hook-form';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { preventDefault } from '@/helpers/preventDefault';
import { Yup } from '@/validation';
import { useNavigate } from 'react-router-dom';
import { PageWithJSbasedForm } from '../../components/PageWithJSbasedForm';
// import { yupResolver } from '@hookform/resolvers/yup';

// interface FormValues {
//   name: string | null,
//   email: string | null,
//   password: string | null,
//   confirmPassword: string | null
// };

// const defaultValues = {
//   name: null,
//   email: null,
//   password: null,
//   confirmPassword: null
// };

// const schema = Yup.object({
//   name: Yup.string().nullable().required(),
//   email: Yup.string().nullable().email().required(),
//   password: Yup.string().nullable().required(),
//   confirmPassword: Yup.string().nullable().required()
// });

// function yupResolver(schema: Yup.ObjectSchema<{ name: string; email: string; password: string; confirmPassword: string; }, Yup.AnyObject, { name: undefined; email: undefined; password: undefined; confirmPassword: undefined; }, "">): import("react-hook-form").Resolver<{ name: null; email: null; password: null; confirmPassword: null; }, any> | undefined {
//   throw new Error('Function not implemented.');
// }

export default function Registration () {
  // const navigate = useNavigate();
  // const form = useForm({
  //   defaultValues,
  //   resolver: yupResolver(schema)
  // });
  // const handleSubmit = (values: FormValues) => {
    // authApi.register(values).then(() => {
    //   navigate('/login');
    // }).catch((error) => {
    // });
  // };

  return (
  <Box marginTop={12}>
    <PageWithJSbasedForm />
    {/* <FormProvider {...form}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <LockOpenIcon color="primary"/>


      </Box>

      <Grid
        noValidate
        container
        spacing={2}
        alignItems="center"
        direction="column"
        component="form"
        onSubmit={preventDefault(form.handleSubmit(handleSubmit))}
      >
        <Grid item>
          <TextField
            required
            margin="dense"
            name="name"
            label={'Name'}
            placeholder={'Enter name ...'}
            variant="outlined"
          />
          
          <TextField
            required
            margin="dense"
            type="email"
            name="email"
            label={'E-mail addressl'}
            placeholder={'Enter e-mail ...'}
            maxRows={4}
          />

          <TextField
            required
            margin="dense"
            type="password"
            name="password"
            label={'Password'}
            placeholder={'Enter password ...'}
          />

          <TextField
            required
            type="password"
            margin="dense"
            name="confirmPassword"
            label={'Repeat password'}
            placeholder={'Enter password ...'}
          />
        </Grid>

        <Grid item>
          <Button
            type="submit"
            variant="contained"
            size="large"
          >
            {'Register'}
          </Button>
        </Grid>
      </Grid>
    </FormProvider> */}
  </Box>
  );
};


