import axios, { AxiosResponse } from 'axios';
import { getCookie, setCookie } from 'common/utils';

export const apiClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
    headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(async (config) => {
    const token = getCookie('token');
    if (token) {
        config.headers.Token = `${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        response.data.error === 'date_expired' && setCookie('token', '', 30);

        return response;
    },
    (error: any) => {
        switch (error?.code) {
            case 'ERR_NETWORK':
                console.log(error.code);
                break;
            default:
                console.log(error.code);
        }
        return Promise.reject(error);
    },
);
