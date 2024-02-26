import { Loading } from 'components/loading';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from 'common/utils';
import { userLogout } from 'store/reducers/userReducer';
export interface AuthGuardProps {
    children?: JSX.Element;
    guardCondition?: boolean;
    redirect?: string;
}

export default function AuthGuard({ children, guardCondition, redirect }: AuthGuardProps): JSX.Element {
    const navigate = useNavigate();

    const user = useSelector((state: any) => state.user.profile);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        const token = getCookie('token');
        setTimeout(() => {
            if (user && token) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
                dispatch(userLogout());
            }
            setIsLoading(false);
        });
    }, [user]);

    const render = useCallback(() => {
        if (guardCondition === isLogin) {
            return children;
        } else if (redirect) {
            setTimeout(() => {
                navigate(redirect, { replace: true });
            });
        }
        return '';
    }, [children, redirect, isLogin]);

    return <>{isLoading ? <Loading /> : render && render()}</>;
}
