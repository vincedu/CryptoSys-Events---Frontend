import React, { useRef } from 'react';
import { makeStyles, Grid, Paper, Divider, Typography, IconButton, TextField } from '@material-ui/core';
import { Event } from '@material-ui/icons';
import { LocalizationProvider, DateRangePicker } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import frLocale from 'date-fns/locale/fr';
import { AutoComplete } from '@components';

const useStyles = makeStyles((theme) => ({
    // Header
    promotion: {
        paddingBottom: 40,
        background: 'linear-gradient(70deg, rgba(50,72,86,1) 0%, rgba(99,140,166,1) 100%)',
        boxSizing: 'border-box!important',
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
    },
    grid: {
        paddingTop: '6vh',
        maxHeight: '100%',
    },
    logo: {
        maxWidth: '100%',
    },
    title: {
        color: 'white',
        fontFamily: `'Bebas Neue', sans-serif`,
    },
    spectacular: {
        fontSize: '2rem',
        [theme.breakpoints.up('sm')]: {
            fontSize: '3rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '4rem',
        },
    },
    // Custom Search Bar
    searchBar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    divider: {
        height: 28,
        margin: 4,
        backgroundColor: 'grey',
    },
    underline: {
        cursor: 'pointer',
        border: 'none!important',
    },
}));

const MainPageHeader = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const history = useHistory();
    const searchBarRef = useRef();

    const handleDateChange = (selectedDate) => {
        if (selectedDate[0] && selectedDate[1]) {
            history.push({
                pathname: '/search',
                state: {
                    date: {
                        min: selectedDate[0],
                        max: selectedDate[1],
                    },
                },
            });
        }
    };

    return (
        <Grid container className={classes.promotion} direction="row" justify="center">
            <Grid item className={classes.grid} xs={11} sm={8} md={7}>
                <Grid container style={{ alignItems: 'center', justifyContent: 'center', padding: '10px 0 50px' }}>
                    <Grid item xs={6}>
                        <img src="/spectacular.svg" alt="Spectacular" className={classes.logo} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={`${classes.title} ${classes.spectacular}`}>Spectacular</Typography>
                        <Typography variant="body1" className={classes.title}>
                            {t('mainPageHeader.paragraph')}
                        </Typography>
                    </Grid>
                </Grid>
                <Paper className={classes.searchBar} ref={searchBarRef}>
                    <LocalizationProvider
                        {...(t('language') === 'fr' && { locale: frLocale })}
                        dateAdapter={DateFnsUtils}
                    >
                        <DateRangePicker
                            onChange={(selectedDate) => handleDateChange(selectedDate)}
                            value={[null, null]}
                            startText={t('mainPageHeader.date')}
                            renderInput={(inputProps) => {
                                const finalProps = { ...inputProps };
                                finalProps.helperText = '';
                                finalProps.style = { width: '100%' };
                                finalProps.InputProps = {
                                    endAdornment: (
                                        <IconButton color="primary" onClick={inputProps.inputProps.onFocus}>
                                            <Event />
                                        </IconButton>
                                    ),
                                    classes: {
                                        root: classes.underline,
                                        focused: classes.underline,
                                        notchedOutline: classes.underline,
                                    },
                                };
                                return <TextField {...finalProps} />;
                            }}
                            disablePast
                        />
                    </LocalizationProvider>
                    <Divider className={classes.divider} orientation="vertical" />
                    <div style={{ flex: 4 }}>
                        <AutoComplete searchBarRef={searchBarRef} />
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};
MainPageHeader.propTypes = {};

export default MainPageHeader;
