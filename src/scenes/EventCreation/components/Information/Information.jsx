import React from 'react';
import { Grid, makeStyles, Hidden, Button } from '@material-ui/core';
import { FindInPage, Event, Map } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TitledPaper } from '@components';
import GeneralInfo from './components/GeneralInfo';
import Location from './components/Location';
import DateTime from './components/DateTime';

const useStyles = makeStyles((theme) => ({
    horizontalLine: {
        margin: 30,
        border: 0,
        height: 1,
        backgroundColor: '#e2e2e2',
    },
    icon: {
        fontSize: '5em',
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            fontSize: '3em',
        },
    },
    iconGrid: {
        paddingTop: '20px',
        color: 'lightgrey',
    },
    lowerbutton: {
        padding: 15,
        margin: '60px 10px 0 10px',
    },
}));

export const Information = (props) => {
    Information.propTypes = {
        handleFormChange: PropTypes.func.isRequired,
        handleDateChange: PropTypes.func.isRequired,
        handleNextButtonClick: PropTypes.func.isRequired,
        handleLocationChange: PropTypes.func.isRequired,
        value: PropTypes.object.isRequired,
        form: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
    };
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <TitledPaper>
            <Grid container justify="center">
                <Hidden xsDown>
                    <Grid item md={1} className={classes.iconGrid}>
                        <FindInPage className={classes.icon} />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={11} md={9} className={classes.noPaddingLeft}>
                    <GeneralInfo value={props.form} onChange={props.handleFormChange} />
                    <hr className={classes.horizontalLine} />
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Hidden xsDown>
                    <Grid item md={1} className={classes.iconGrid}>
                        <Map className={classes.icon} />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={11} md={9} className={classes.noPaddingLeft}>
                    <Location value={props.value} onChange={props.handleLocationChange} />
                    <hr className={classes.horizontalLine} />
                </Grid>
            </Grid>
            <Grid container justify="center">
                <Hidden xsDown>
                    <Grid item md={1} className={classes.iconGrid}>
                        <Event className={classes.icon} />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={11} md={9} className={classes.noPaddingLeft}>
                    <DateTime value={props.date} onChange={props.handleDateChange} />
                </Grid>
            </Grid>
            <Grid container justify="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.lowerbutton}
                    onClick={props.handleNextButtonClick}
                >
                    {t('next')}
                </Button>
            </Grid>
        </TitledPaper>
    );
};

export default Information;
