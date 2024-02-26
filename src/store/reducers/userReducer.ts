import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from 'common/utils';

export interface UserInterface {
    first_name: string;
    last_name: string;
    email: string;
    phone: number;
    user_type: string;
    user_id: string;
}
const initialState = {
    profile: undefined as UserInterface | undefined,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, { payload }) => {
            state.profile = payload as UserInterface | undefined;
        },
        userLogout: (state) => {
            setCookie('token', '', 30);
            state.profile = initialState.profile;
        },
    },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice.reducer;
