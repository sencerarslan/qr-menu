import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTheme: 'light',
};
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, { payload }) => {
            state.currentTheme = payload;
            document.documentElement.setAttribute('data-mui-color-scheme', payload);
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
