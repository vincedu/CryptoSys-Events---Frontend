import React from 'react';
import { Grid, makeStyles, Hidden } from '@material-ui/core';
import { FindInPage, Event, Map } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { TitledPaper } from '@components';
import GeneralInfoForm from './components/GeneralInfoForm';
import LocationForm from './components/LocationForm';
import DateTimeForm from './components/DateTimeForm';

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

const EventInformationForm = (props) => {
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
                    <GeneralInfoForm value={props.generalInfoForm} onChange={props.onGeneralInfoFormChange} />
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
                    <LocationForm value={props.locationForm} onChange={props.onLocationFormChange} />
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
                    <DateTimeForm value={props.dateForm} onChange={props.onDateFormChange} />
                </Grid>
            </Grid>
        </TitledPaper>
    );
};

EventInformationForm.propTypes = {
    generalInfoForm: PropTypes.object.isRequired,
    onGeneralInfoFormChange: PropTypes.func.isRequired,
    locationForm: PropTypes.object.isRequired,
    onLocationFormChange: PropTypes.func.isRequired,
    dateForm: PropTypes.object.isRequired,
    onDateFormChange: PropTypes.func.isRequired,
};

export default EventInformationForm;
