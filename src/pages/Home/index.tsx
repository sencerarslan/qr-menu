import { Styled } from './index.styles';
import { useCallback, useEffect, useState } from 'react';
import apiService from 'services/api/index.api';
import { Loading } from 'components/loading';
import {
    Box,
    Button,
    CardMedia,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Cancel, Edit, MenuBook } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { routesPaths } from 'config/routes';
import { useNavigate } from 'react-router-dom';

export interface HomePageProps {}

const HomePage = () => {
    const navigate = useNavigate();
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const validation = yup.object().shape({
        name: yup.string().required(),
    });
    const formik = useFormik<any>({
        initialValues: {
            id: '',
            name: '',
            logo: '',
            banner: '',
        },
        onSubmit: async () => {
            handleSubmit(formik.values);
        },
        validationSchema: validation,
    });
    const isFormValid = formik.isValid;

    const setFormikFunc = (data: any) => {
        formik.setFieldValue('id', data.id);
        formik.setFieldValue('name', data.name);
        formik.setFieldValue('logo', data.logo);
        formik.setFieldValue('banner', data.banner);
    };

    const handleClick = (event: any) => {
        event.preventDefault();
        formik.handleSubmit();
    };

    const handleSubmit = async (data: any) => {
        try {
            await apiService
                .MenuAdd({
                    ID: data.id,
                    name: data.name,
                    logo: data.logo,
                    banner: data.banner,
                })
                .then((res: any) => {
                    if (res.success) {
                        handleData();
                        formik.resetForm();
                    }
                })
                .catch((err: any) => {
                    console.log('err:', err);
                });
        } catch (err) {
            console.log('err:', err);
        }
    };

    const handleData = useCallback(async () => {
        setLoadingState(false);
        await apiService
            .AllMenu()
            .then((res: any) => {
                if (res.success) {
                    setData(res.data);
                }
                setLoadingState(true);
            })
            .catch(() => {
                setLoadingState(true);
            });
    }, []);

    const handleDelete = useCallback(async (id: any) => {
        if (confirm('Are you sure you want to delete?')) {
            try {
                const res = await apiService.MenuDelete({ ID: id });
                if (res.success) {
                    formik.resetForm();
                    handleData();
                }
            } catch (error) {
                console.error(error);
            }
        }
    }, []);

    useEffect(() => {
        handleData();
    }, []);

    return (
        <Styled>
            {loadingState ? (
                <Box
                    sx={{ minHeight: 'calc(100vh - 107px)' }}
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    alignItems="center"
                    justifyContent="center"
                    gap="115px"
                >
                    <Box
                        width={300}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        gap="15px"
                    >
                        <div className="container">
                            <Typography component="h1" variant="h5">
                                {!formik.values.id ? 'New Menu' : 'Edit Menu'}
                            </Typography>
                            <form className="form" onSubmit={handleClick}>
                                <TextField
                                    id="name"
                                    name="name"
                                    margin="normal"
                                    autoComplete="name"
                                    autoFocus
                                    fullWidth
                                    color="secondary"
                                    label={'Name'}
                                    variant="outlined"
                                    value={formik.values.name}
                                    onChange={(e: any) => {
                                        formik.setFieldValue('name', e.target.value);
                                    }}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                />
                                <TextField
                                    id="logo"
                                    name="logo"
                                    margin="normal"
                                    autoComplete="logo"
                                    fullWidth
                                    color="secondary"
                                    value={formik.values.logo}
                                    label={'Logo Url'}
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        formik.setFieldValue('logo', e.target.value);
                                    }}
                                    error={formik.touched.logo && Boolean(formik.errors.logo)}
                                />
                                <TextField
                                    id="banner"
                                    name="banner"
                                    margin="normal"
                                    autoComplete="banner"
                                    fullWidth
                                    color="secondary"
                                    value={formik.values.banner}
                                    label={'Banner Url'}
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        formik.setFieldValue('banner', e.target.value);
                                    }}
                                    error={formik.touched.banner && Boolean(formik.errors.banner)}
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
                                    {!formik.values.id ? 'Save' : 'Update'}
                                </Button>
                                <Button
                                    sx={{ mt: 1 }}
                                    fullWidth
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={!formik.values.id}
                                    onClick={() => {
                                        formik.resetForm();
                                    }}
                                >
                                    Clear
                                </Button>
                            </form>
                        </div>
                    </Box>
                    {data ? (
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            gap="15px"
                        >
                            <Table sx={{ maxWidth: 550 }} size="small">
                                <TableBody>
                                    {data.map((item: any) => (
                                        <TableRow
                                            key={item.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell
                                                onClick={() => navigate(`${routesPaths.group}/${item.id}`)}
                                                component="th"
                                                sx={{ cursor: 'pointer' }}
                                                scope="row"
                                            >
                                                <Box display="flex" flexDirection="row" alignItems="center" gap="15px">
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 100 }}
                                                        image={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://qr-menu-wheat.vercel.app/qr/${item.id}`}
                                                        alt={item.name}
                                                    />
                                                    <div> {item.name}</div>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip
                                                    children={
                                                        <IconButton
                                                            onClick={() => {
                                                                setFormikFunc(item);
                                                            }}
                                                        >
                                                            <Edit />
                                                        </IconButton>
                                                    }
                                                    title={'Edit'}
                                                />
                                                <Tooltip
                                                    children={
                                                        <IconButton
                                                            onClick={() => {
                                                                handleDelete(item.id);
                                                            }}
                                                            color="secondary"
                                                        >
                                                            <Cancel />
                                                        </IconButton>
                                                    }
                                                    title={'Delete'}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <MenuBook fontSize="large" color="disabled" />
                            <Typography component="h1" variant="h5" color="disabled">
                                No Result
                            </Typography>
                            <p>No content created yet...</p>
                        </Box>
                    )}
                </Box>
            ) : (
                <Loading />
            )}
        </Styled>
    );
};
export default HomePage;
