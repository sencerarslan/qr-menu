import { setCookie } from 'common/utils';
import { UserInterface, userLogin, userLogout } from 'store/reducers/userReducer';

// Giriş Yap
export function handleLogin(dispatch: any, data: any) {
    const tempUser: UserInterface = data;
    setCookie('token', data.token, 1);
    dispatch(userLogin(tempUser));
}

// Çıkış Yap
export async function handleLogout(dispatch: any) {
    try {
        dispatch(userLogout());
    } catch (err) {
        console.log('err:', err);
    }
}
