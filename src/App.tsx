import { useEffect } from 'react';
import './App.css';
import AppRoutes from 'components/app-routes';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { CssBaseline, PaletteOptions, experimental_extendTheme } from '@mui/material';
import { lightThemeColor, darkThemeColor } from './common/theme/colors';
import { useSelector } from 'react-redux';

function App() {
    const currentTheme = useSelector((state: any) => state.theme.currentTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-mui-color-scheme', currentTheme);
    }, []);

    const theme = experimental_extendTheme({
        colorSchemes: {
            light: {
                palette: lightThemeColor as PaletteOptions,
            },
            dark: {
                palette: darkThemeColor as PaletteOptions,
            },
        },
        shape: {
            borderRadius: 6,
        },
        typography: {
            fontFamily: 'Inter',
            button: {
                textTransform: 'none',
            },
        },
    });

    return (
        <CssVarsProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <AppRoutes />
            </div>
        </CssVarsProvider>
    );
}

export default App;
