import React from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { Styled } from './index.styles';
import apiService from 'services/api/index.api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { handleLogin } from 'common/auth/Authentication';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { routesPaths } from 'config/routes';
import Logo from 'components/logo';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validation = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });
    const formik = useFormik<any>({
        initialValues: {
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
                .Login({
                    email: data.email,
                    Password: data.password,
                })
                .then((res: any) => {
                    console.log(res);
                    handleLogin(dispatch, res.data);
                    setTimeout(() => {
                        navigate(routesPaths.base);
                    });
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
                <div className="container">
                    <Logo />

                    <Typography mt={2} component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className="form" onSubmit={handleClick}>
                        <TextField
                            id="email"
                            name="email"
                            margin="normal"
                            autoComplete="email"
                            autoFocus
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
                            Login
                        </Button>
                        <Button
                            sx={{ mt: 1 }}
                            fullWidth
                            href={routesPaths.register}
                            type="button"
                            variant="contained"
                            color="inherit"
                            size="large"
                        >
                            Register
                        </Button>
                    </form>
                </div>
            </Container>
        </Styled>
    );
};

export default Login;
