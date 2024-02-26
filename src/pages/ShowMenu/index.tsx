import { Styled } from './index.styles';
import { useCallback, useEffect, useState } from 'react';
import apiService from 'services/api/index.api';
import { Loading } from 'components/loading';
import { Box, CardMedia, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';

export interface ShowMenuPageProps {}

const ShowMenuPage = () => {
    const { menu_id } = useParams();
    const [loadingState, setLoadingState] = useState<boolean>(true);
    const [data, setData] = useState<any>();

    const handleData = useCallback(async () => {
        setLoadingState(false);
        await apiService
            .ShowMenu({ menu_id: menu_id })
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
            {loadingState && data ? (
                <Box
                    sx={{ minHeight: 'calc(100vh - 107px)' }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap="15px"
                >
                    <h2 style={{ margin: 0 }}>{data.name}</h2>

                    <Table sx={{ maxWidth: 350 }} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.menu_items?.map((item: any) => (
                                <TableRow key={item.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            ) : (
                <Loading />
            )}
        </Styled>
    );
};
export default ShowMenuPage;
