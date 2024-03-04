import { Styled } from './index.styles';
import { useCallback, useEffect, useState } from 'react';
import apiService from 'services/api/index.api';
import { Loading } from 'components/loading';
import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { ArrowBack, Cancel, Edit, MenuBook } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { routesPaths } from 'config/routes';
import { useNavigate, useParams } from 'react-router-dom';

export interface HomePageProps {}

const GroupMenu = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [data, setData] = useState<[]>([]);

    const validation = yup.object().shape({
        name: yup.string().required(),
    });
    const formik = useFormik<any>({
        initialValues: {
            id: '',
            name: '',
        },
        onSubmit: async () => {
            handleSubmit(formik.values);
        },
        validationSchema: validation,
    });

    const isFormValid = formik.isValid;

    const setFormikFunc = (data: any) => {
        formik.setFieldValue('id', data.ID);
        formik.setFieldValue('name', data.name);
    };

    const handleClick = (event: any) => {
        event.preventDefault();
        formik.handleSubmit();
    };

    const handleSubmit = async (data: any) => {
        try {
            await apiService
                .GroupMenuAdd({
                    ID: data.id,
                    menu_id: id,
                    name: data.name,
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
            .AllGroupMenu({ ID: id })
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
                const res = await apiService.GroupMenuDelete({ ID: id });
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
    }, [id]);

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
                    flexWrap="wrap"
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
                            <Box display="flex" alignItems="center">
                                <Tooltip
                                    children={
                                        <IconButton onClick={() => history.back()}>
                                            <ArrowBack />
                                        </IconButton>
                                    }
                                    title={'Back'}
                                />
                                <Typography component="h1" variant="h5">
                                    {!formik.values.id ? 'New Group' : 'Edit Group'}
                                </Typography>
                            </Box>
                            <form className="form" onSubmit={handleClick}>
                                <TextField
                                    id="name"
                                    name="name"
                                    margin="normal"
                                    autoComplete="name"
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
                    {data.length > 0 ? (
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
                                                onClick={() => navigate(`${routesPaths.groupMenu}/${item.ID}`)}
                                                component="th"
                                                sx={{ cursor: 'pointer' }}
                                                scope="row"
                                            >
                                                <Box display="flex" flexDirection="row" alignItems="center" gap="15px">
                                                    <Box display="flex" flexDirection="column">
                                                        <b>{item.name}</b>
                                                    </Box>
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
                                                                handleDelete(item.ID);
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
export default GroupMenu;
