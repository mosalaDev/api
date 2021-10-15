import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
        default: {
            main: '#444',
            dark: '#333',
            light: '#666'
        },
        primary: {
            main: '#0020b1',
        },
        secondary: {
            main: '#FF7A00',
            dark: '#DE6B00',
            contrastText: "#fff"
        },
    },
    typography: {
        h1: {
            fontSize: '2.5rem',
            fontWeight: '500',
        },
        h2: {
            fontSize: '2.1rem',
            fontWeight: 'bold',
        },
        h3: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
        },
        h4: {
            fontSize: '1.6rem',
            fontWeight: 'bold',
        },
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});

export default theme;