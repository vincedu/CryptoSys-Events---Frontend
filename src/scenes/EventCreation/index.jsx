import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GeneralInfo from './components/GeneralInfo';
import Location from './components/Location';
import DateTime from './components/DateTime';
import TicketCreation from './TicketCreation/TicketCreation';
import theme from '../../theme';

const useStyles = makeStyles((t) => ({
    root: () => ({
        backgroundColor: t.palette.background.default,
    }),
}));

const EventCreation = () => {
    const classes = useStyles(theme);
    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch" className={classes.root}>
            <h2 color="secondary">Création d&apos;événement</h2>
            <Grid item sm={12}>
                <GeneralInfo />
                <Location />
                <DateTime />
                <TicketCreation />
            </Grid>
        </Grid>
    );
};

export default EventCreation;
