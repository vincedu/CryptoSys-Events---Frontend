import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import EventList from './EventList';

// import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    eventListContainer: {
        padding: 20,
    },
    categoryTitle: {
        padding: '10px 0px 0px 20px',
        textAlign: 'left',
        color: 'orange',
    },
    horizontalLine: {
        backgroundColor: 'orange',
        height: 2,
        borderWidth: 0,
        marginBottom: 25,
    },
});

export default function EventListContainer() {
    const classes = useStyles();

    // Fetch categories from DB
    // TODO potentiellement à changer de file
    function FetchCategories() {
        return [
            {
                id: 1,
                name: 'Live Concert',
            },
            {
                id: 2,
                name: 'Virtual Concert',
            },
            {
                id: 3,
                name: 'Virtual Gaming',
            },
        ];
    }
    const categories = FetchCategories();

    return (
        <div className={classes.eventListContainer}>
            <Alert severity="warning" component={RouterLink} to="/covid" style={{ textDecoration: 'none' }}>
                See our latest COVID-19 ressources to stay safe and manage your events
            </Alert>
            {categories.map((category) => (
                <div className={classes.eventListContainer} key={category.id}>
                    <Typography className={classes.categoryTitle} variant="h4">
                        {category.name}
                    </Typography>
                    <hr className={classes.horizontalLine} />
                    <EventList category={category.name} id={category.id} />
                </div>
            ))}
        </div>
    );
}
