import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#324856',
            light: '#5d7383',
            dark: '#08212d',
        },
        secondary: {
            main: '#d66c44',
            light: '#ff9c70',
            dark: '#9f3e1a',
        },
        background: {
            default: '#F7F9FC',
            gradient: 'linear-gradient(30deg, rgba(244,249,255,1) 0%, rgba(247,249,252,1) 100%)',
        },
        divider: 'rgba(250,250,250,0.5)',
        colors: {
            nightfall: '#324856',
            rawSienna: '#d18237',
            coolSage: '#4a746a',
            sunset: '#d66c44',
            white: '#FFFFFF',
            black: '#000000',
            lightContrastText: '#fff',
            darkContrastText: '#000',
        },
        action: {
            hover: 'rgba(214,108,68, 0.75)',
            selected: 'rgba(214,108,68, 1)',
            focus: 'rgba(214,108,68, 1)',
            active: 'rgba(214,108,68, 1)',
            disabled: 'rgba(0,0,0, 0.5)',
        },
    },
    overrides: {
        MuiOutlinedInput: {
            root: {
                borderRadius: '3px',
                backgroundColor: '#fff',
            },
            adornedEnd: {
                paddingRight: 0,
            },
        },
    },
});

export default theme;
