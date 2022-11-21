import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
            dark: '#053e85',
            light: '#42a5f5'
        },
    },
    typography: {
        fontFamily: [
            'Inter', '-apple-system', 'BlinkMacSystemFont', 'segoe ui', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'
        ].join(',')
    }
});

export default theme;