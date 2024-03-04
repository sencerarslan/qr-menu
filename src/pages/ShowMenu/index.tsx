import { Styled } from './index.styles';
import { useCallback, useEffect, useState } from 'react';
import apiService from 'services/api/index.api';
import { Loading } from 'components/loading';
import { Box, CardMedia, Container, Link } from '@mui/material';
import { useParams } from 'react-router-dom';
import Logo from 'components/logo';
import { routesPaths } from 'config/routes';

export interface ShowMenuPageProps {}

const ShowMenuPage = () => {
    const { id } = useParams();
    const [loadingState, setLoadingState] = useState<boolean>(false);
    const [data, setData] = useState<any>();

    const handleData = useCallback(async () => {
        setLoadingState(false);
        await apiService
            .ShowMenu({ ID: id })
            .then((res: any) => {
                if (res.success) {
                    setData(res.data);
                    setLoadingState(true);
                }
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
                <>
                    <CardMedia width="100%" height="200px" component="img" image={data.banner} alt={data.banner} />
                    <Container>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            gap="15px"
                            mt={2}
                            pt={5}
                            pb={5}
                        >
                            <img src={data.logo} height={50} alt={data.name} />
                            {data.menu_groups?.map(
                                (item: any, index: number) =>
                                    item.items?.length > 0 && (
                                        <Box display="flex" flexDirection="column" gap="15px" key={index}>
                                            <div className="group-title">{item.name}</div>
                                            <div className="list">
                                                {item.items?.map((item: any, indexs: number) => (
                                                    <div key={indexs} className="card">
                                                        <div className="left">
                                                            <img src={item.image_url} alt={item.name} />
                                                        </div>
                                                        <div className="right">
                                                            <div className="title">{item.name}</div>
                                                            <div className="desc">{item.description}</div>
                                                            <div className="price">
                                                                {Number(item.price).toFixed(2)} TL
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Box>
                                    ),
                            )}
                        </Box>
                        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={2}>
                            <Logo />
                            <Link href={routesPaths.base} target="_blank" color="secondary" underline="none">
                                <small>New QR Menu</small>
                            </Link>
                        </Box>
                    </Container>
                </>
            ) : (
                <Loading />
            )}
        </Styled>
    );
};
export default ShowMenuPage;
