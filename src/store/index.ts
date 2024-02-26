import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/themeReducer';
import searchReducer from './reducers/searchReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedSearchReducer = persistReducer(persistConfig, searchReducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        theme: persistedThemeReducer,
        search: persistedSearchReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
