import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchText: 'Pokemon',
    filterType: '',
    filterDate: '',
    page: '1',
};
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch: (state, { payload }) => {
            state.searchText = payload;
        },
        setFilterType: (state, { payload }) => {
            state.filterType = payload;
        },
        setFilterDate: (state, { payload }) => {
            state.filterDate = payload;
        },
        setPage: (state, { payload }) => {
            state.page = payload;
        },
    },
});

export const { setSearch, setFilterType, setFilterDate, setPage } = searchSlice.actions;
export default searchSlice.reducer;
