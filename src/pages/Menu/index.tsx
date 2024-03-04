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
import { ArrowBack, Cancel, Edit, MenuBook } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

export interface HomePageProps {}

const MenuItem = () => {
    const { id } = useParams();
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [data, setData] = useState<[]>([]);

    const validation = yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required(),
        price: yup.number().required(),
        imageurl: yup.string().required(),
    });
    const formik = useFormik<any>({
        initialValues: {
            name: '',
            description: '',
            price: '',
            imageurl: '',
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
        formik.setFieldValue('description', data.description);
        formik.setFieldValue('price', data.price);
        formik.setFieldValue('imageurl', data.image_url);
    };

    const handleClick = (event: any) => {
        event.preventDefault();
        formik.handleSubmit();
    };

    const handleSubmit = async (data: any) => {
        try {
            console.log(data);
            await apiService
                .MenuItemAdd({
                    group_id: id,
                    ID: data.id,
                    name: data.name,
                    description: data.description,
                    image_url: data.imageurl,
                    price: Number(data.price),
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
            .AllGroupItemMenu({ ID: id })
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
                const res = await apiService.MenuItemDelete({ ID: id });
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
                                    {!formik.values.id ? 'New Item' : 'Edit Item'}
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
                                <TextField
                                    id="description"
                                    name="description"
                                    margin="normal"
                                    autoComplete="description"
                                    fullWidth
                                    color="secondary"
                                    label={'Description'}
                                    value={formik.values.description}
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        formik.setFieldValue('description', e.target.value);
                                    }}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                />
                                <TextField
                                    id="price"
                                    name="price"
                                    type="number"
                                    margin="normal"
                                    autoComplete="price"
                                    fullWidth
                                    color="secondary"
                                    value={formik.values.price}
                                    label={'Price'}
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        formik.setFieldValue('price', e.target.value);
                                    }}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                />
                                <TextField
                                    id="imageurl"
                                    name="imageurl"
                                    margin="normal"
                                    autoComplete="imageurl"
                                    fullWidth
                                    color="secondary"
                                    value={formik.values.imageurl}
                                    label={'Image Url'}
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        formik.setFieldValue('imageurl', e.target.value);
                                    }}
                                    error={formik.touched.imageurl && Boolean(formik.errors.imageurl)}
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
                                            <TableCell component="th" scope="row">
                                                <Box display="flex" flexDirection="row" alignItems="center" gap="15px">
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 50 }}
                                                        image={item.image_url}
                                                        alt={item.name}
                                                    />
                                                    <Box display="flex" flexDirection="column">
                                                        <strong> {item.name}</strong>
                                                        <small> {item.description}</small>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <div>{item.price} TL</div>
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
export default MenuItem;
