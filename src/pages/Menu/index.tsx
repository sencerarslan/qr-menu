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
import { Delete, Edit, MenuBook } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { routesPaths } from 'config/routes';
import { useParams } from 'react-router-dom';

export interface HomePageProps {}

const HomePage = () => {
    const { menu_id, item_id } = useParams();
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [data, setData] = useState<any>();

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

    const handleClick = (event: any) => {
        event.preventDefault();
        formik.handleSubmit();
    };

    const handleSubmit = async (data: any) => {
        try {
            await apiService
                .MenuItemAdd({
                    ID: item_id,
                    menu_id: menu_id,
                    name: data.name,
                    description: data.description,
                    price: Number(data.price),
                    image_url: data.imageurl,
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
            .GetMenu({ menu_id: menu_id })
            .then((res: any) => {
                console.log(res.menu);
                setData(res.menu);
                setLoadingState(true);

                if (item_id) {
                    const itemData = res.menu.menu_items.find((i: any) => i.ID === item_id);

                    formik.setFieldValue('name', itemData.name);
                    formik.setFieldValue('description', itemData.description);
                    formik.setFieldValue('price', itemData.price);
                    formik.setFieldValue('imageurl', itemData.image_url);
                }
            })
            .catch(() => {
                setLoadingState(true);
            });
    }, []);

    const handleDelete = useCallback(async (id: any) => {
        await apiService.MenuItemDelete({ ID: id }).then(() => {
            if (item_id) {
                window.location.href = `${routesPaths.menuControl}/${menu_id}`;
            }
        });
    }, []);

    useEffect(() => {
        handleData();
    }, [item_id]);

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
                                {data?.name}
                            </Typography>
                            <form className="form" key={menu_id + '-' + item_id} onSubmit={handleClick}>
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
                                    Save
                                </Button>
                                <Button
                                    sx={{ mt: 1 }}
                                    fullWidth
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    href={`${routesPaths.menuControl}/${menu_id}`}
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
                                    {data.menu_items?.map((item: any) => (
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
                                            <TableCell align="right">${item.price}</TableCell>
                                            <TableCell align="right">
                                                <Box display="flex" flexDirection="row" alignItems="center" gap="15px">
                                                    <IconButton
                                                        href={`${routesPaths.menuControl}/${item.menu_id}/${item.ID}`}
                                                        size="large"
                                                    >
                                                        <Edit />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDelete(item.ID)}
                                                        color="error"
                                                        size="large"
                                                    >
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
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
