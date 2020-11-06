import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, InputBase, Paper, Divider, Typography, Hidden, IconButton } from '@material-ui/core';
import { LocationOn, Search, Event } from '@material-ui/icons';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';

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
    // Custom Search Bar
    searchBar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        marginLeft: theme.spacing(1),
    },
    divider: {
        height: 28,
        margin: 4,
        backgroundColor: 'grey',
    },
    underline: {
        '&::before': {
            borderBottom: 'none!important',
        },
        '&::after': {
            borderBottom: 'none!important',
        },
    },
}));

const CustomSearchBar = (props) => {
    CustomSearchBar.propTypes = {
        history: PropTypes.object.isRequired,
    };

    const { t } = useTranslation();
    const classes = useStyles();
    const { history } = props;
    const date = new Date();
    const locationRef = useRef();
    const searchRef = useRef();

    const handleDateChange = (selectedDate) => {
        history.push({
            pathname: `/date/${selectedDate}`,
            state: {
                date: selectedDate,
            },
        });
    };

    const handleLocation = () => {
        if (locationRef.current.value === '') return;
        history.push({
            pathname: `/location/${locationRef.current.value}`,
            state: {
                location: locationRef.current.value,
            },
        });
    };

    const handleSearch = () => {
        if (searchRef.current.value === '') return;
        history.push({
            pathname: `/search/${searchRef.current.value}`,
            state: {
                search: searchRef.current.value,
            },
        });
    };

    const checkEnterKey = (key, field) => {
        if (key.keyCode === 13) {
            if (field === 'search') handleSearch();
            if (field === 'location') handleLocation();
        }
    };

    return (
        <Grid container className={classes.promotion} direction="row" justify="center">
            <Grid item className={classes.grid} xs={11} sm={8} md={7}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 50 }}>
                    <div>
                        <img src="/eos.svg" alt="eos event" className={classes.logo} />
                    </div>
                    <div>
                        <Typography variant="h2" className={classes.title}>
                            Eos Event
                        </Typography>
                        <Typography variant="body1" className={classes.title}>
                            {t('customSearchBar.paragraph')}
                        </Typography>
                    </div>
                </div>
                <Paper className={classes.searchBar}>
                    <Hidden smDown>
                        <InputBase
                            inputRef={locationRef}
                            className={classes.input}
                            style={{ flex: 1 }}
                            placeholder={t('customSearchBar.location')}
                            onKeyDown={(e) => checkEnterKey(e, 'location')}
                        />
                        <IconButton
                            onClick={handleLocation}
                            color="primary"
                            className={classes.iconButton}
                            aria-label="directions"
                        >
                            <LocationOn />
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical" />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                variant="inline"
                                onChange={(selectedDate) => handleDateChange(selectedDate)}
                                value={date}
                                InputProps={{
                                    classes: {
                                        root: classes.underline,
                                        focused: classes.underline,
                                    },
                                    endAdornment: <Event color="primary" className={classes.iconButton} />,
                                }}
                                className={classes.input}
                                style={{ flex: 2 }}
                                disablePast
                            />
                        </MuiPickersUtilsProvider>
                        <Divider className={classes.divider} orientation="vertical" />
                    </Hidden>
                    <InputBase
                        inputRef={searchRef}
                        className={classes.input}
                        style={{ flex: 4 }}
                        placeholder={t('customSearchBar.search')}
                        onKeyDown={(e) => checkEnterKey(e, 'search')}
                    />
                    <IconButton
                        onClick={handleSearch}
                        color="primary"
                        className={classes.iconButton}
                        aria-label="directions"
                    >
                        <Search className={classes.iconButton} />
                    </IconButton>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default withRouter(CustomSearchBar);
