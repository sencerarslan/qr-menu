import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Styled } from './index.styles';
import apiService from 'services/api/index.api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { routesPaths } from 'config/routes';
import { DoneAll } from '@mui/icons-material';
import Logo from 'components/logo';

const Register: React.FC = () => {
    const [state, setState] = useState<boolean>(false);

    const validation = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        phone: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
    });
    const formik = useFormik<any>({
        initialValues: {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            password: '',
        },
        onSubmit: async () => {
            handleSubmit(formik.values);
        },
        validationSchema: validation,
    });
    const isFormValid = formik.isValid;

    const handleClick = (event: any) => {
        event.preventDefault();
        formik.handleSubmit();
    };

    const handleSubmit = async (data: any) => {
        try {
            await apiService
                .Register({
                    first_name: data.firstname,
                    last_name: data.lastname,
                    phone: data.phone,
                    email: data.email,
                    Password: data.password,
                    user_type: 'USER',
                })
                .then((res: any) => {
                    console.log(res);
                    if (res.success) {
                        setState(true);
                    }
                })
                .catch((err: any) => {
                    console.log('err:', err);
                });
        } catch (err) {
            console.log('err:', err);
        }
    };

    return (
        <Styled>
            <Container component="main" maxWidth="xs">
                {!state ? (
                    <div className="container">
                        <Logo />

                        <Typography mt={2} component="h1" variant="h5">
                            Register
                        </Typography>
                        <form className="form" onSubmit={handleClick}>
                            <TextField
                                id="firstname"
                                name="firstname"
                                margin="normal"
                                autoComplete="firstname"
                                fullWidth
                                color="secondary"
                                label={'First Name'}
                                variant="outlined"
                                onChange={(e: any) => {
                                    formik.setFieldValue('firstname', e.target.value);
                                }}
                                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                            />
                            <TextField
                                id="lastname"
                                name="lastname"
                                margin="normal"
                                autoComplete="lastname"
                                fullWidth
                                color="secondary"
                                label={'Last Name'}
                                variant="outlined"
                                onChange={(e: any) => {
                                    formik.setFieldValue('lastname', e.target.value);
                                }}
                                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                            />
                            <TextField
                                id="phone"
                                name="phone"
                                margin="normal"
                                autoComplete="phone"
                                fullWidth
                                color="secondary"
                                label={'Phone'}
                                variant="outlined"
                                onChange={(e: any) => {
                                    formik.setFieldValue('phone', e.target.value);
                                }}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                            />
                            <TextField
                                id="email"
                                name="email"
                                margin="normal"
                                autoComplete="email"
                                fullWidth
                                color="secondary"
                                label={'Email'}
                                variant="outlined"
                                onChange={(e: any) => {
                                    formik.setFieldValue('email', e.target.value);
                                }}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                            />
                            <TextField
                                type={'password'}
                                margin="normal"
                                autoComplete="current-password"
                                id="password"
                                name="password"
                                fullWidth
                                label={'Password'}
                                color="secondary"
                                variant="outlined"
                                onChange={(e: any) => {
                                    formik.setFieldValue('password', e.target.value);
                                }}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                            />
                            <Button
                                sx={{ mt: 1 }}
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="secondary"
                                size="large"
                                disabled={!isFormValid}
                            >
                                Register
                            </Button>
                            <Button
                                sx={{ mt: 1 }}
                                fullWidth
                                href={routesPaths.login}
                                type="button"
                                variant="contained"
                                color="inherit"
                                size="large"
                            >
                                Login
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div className="container">
                        <DoneAll fontSize="large" color="success" />
                        <Typography component="h1" variant="h5" color="green">
                            Successfully
                        </Typography>
                        <p>Registration completed successfully.</p>
                        <Button
                            sx={{ mt: 1 }}
                            href={routesPaths.login}
                            type="button"
                            variant="contained"
                            color="secondary"
                            size="large"
                        >
                            Login
                        </Button>
                    </div>
                )}
            </Container>
        </Styled>
    );
};

export default Register;
