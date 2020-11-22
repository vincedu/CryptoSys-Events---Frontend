import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Grid,
    InputBase,
    Paper,
    Divider,
    Typography,
    Hidden,
    IconButton,
    TextField,
} from '@material-ui/core';
import { LocationOn, Event } from '@material-ui/icons';
import { LocalizationProvider, DateRangePicker } from '@material-ui/pickers';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import { withRouter } from 'react-router-dom';
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
        cursor: 'pointer',
        border: 'none!important',
    },
}));

const MainPageHeader = (props) => {
    MainPageHeader.propTypes = {
        history: PropTypes.object.isRequired,
    };

    const { t } = useTranslation();
    const classes = useStyles();
    const { history } = props;
    const locationRef = useRef();
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

    const handleLocation = () => {
        if (locationRef.current.value === '') return;
        history.push({
            pathname: `/search/${locationRef.current.value}`,
            state: {
                location: locationRef.current.value,
            },
        });
    };

    const checkEnterKey = (key) => {
        if (key.keyCode === 13) handleLocation();
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
                            {t('mainPageHeader.paragraph')}
                        </Typography>
                    </div>
                </div>
                <Paper className={classes.searchBar} ref={searchBarRef}>
                    <Hidden smDown>
                        <InputBase
                            inputRef={locationRef}
                            className={classes.input}
                            inputProps={{ style: { textOverflow: 'ellipsis', overflow: 'hidden' } }}
                            style={{ flex: 1 }}
                            placeholder={t('mainPageHeader.location')}
                            onKeyDown={checkEnterKey}
                        />
                        <IconButton onClick={handleLocation} color="primary">
                            <LocationOn />
                        </IconButton>
                        <Divider className={classes.divider} orientation="vertical" />
                        <LocalizationProvider
                            {...(t('language') === 'fr' && { locale: frLocale })}
                            dateAdapter={DateFnsUtils}
                        >
                            <DateRangePicker
                                onChange={(selectedDate) => handleDateChange(selectedDate)}
                                value={[null, null]}
                                startText={t('mainPageHeader.search')}
                                renderInput={(inputProps) => {
                                    const finalProps = { ...inputProps };
                                    finalProps.helperText = '';
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
                    </Hidden>
                    <div style={{ flex: 4 }}>
                        <AutoComplete searchBarRef={searchBarRef} />
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default withRouter(MainPageHeader);
