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
    Typography,
} from '@mui/material';
import { Edit, MenuBook } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { routesPaths } from 'config/routes';

export interface HomePageProps {}

const HomePage = () => {
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const validation = yup.object().shape({
        name: yup.string().required(),
    });
    const formik = useFormik<any>({
        initialValues: {
            name: '',
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
                .MenuAdd({
                    name: data.name,
                })
                .then((res: any) => {
                    console.log(res);
                    handleData();
                    formik.resetForm();
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
            .AllGetMenu()
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
                    alignItems="center"
                    justifyContent="center"
                    gap="115px"
                >
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="15px">
                        <div className="container">
                            <Typography component="h1" variant="h5">
                                New Menu
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
                                    onChange={(e: any) => {
                                        formik.setFieldValue('name', e.target.value);
                                    }}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
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
                                    Save
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
                            <Table sx={{ maxWidth: 350 }} size="small">
                                <TableBody>
                                    {data.map((item: any) => (
                                        <TableRow
                                            key={item.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Box display="flex" flexDirection="row" alignItems="center" gap="15px">
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 150 }}
                                                        image={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://qr-menu-wheat.vercel.app/menu/${item.menu_id}`}
                                                        alt={item.name}
                                                    />
                                                    <div> {item.name}</div>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                {item.menu_items ? item.menu_items.length : 0} Items
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    href={`${routesPaths.menuControl}/${item.menu_id}`}
                                                    size="large"
                                                >
                                                    <Edit />
                                                </IconButton>
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
