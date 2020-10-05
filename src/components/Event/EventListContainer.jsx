import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EventList from './EventList';

// import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    eventListContainer: {
        padding: 20,
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
                category: 'Live Concert',
            },
            {
                id: 2,
                category: 'Virtual Concert',
            },
            {
                id: 3,
                category: 'Virtual Gaming',
            },
        ];
    }
    const categories = FetchCategories();

    return (
        <div className={classes.eventListContainer}>
            {categories.map((category) => (
                <div className={classes.eventListContainer}>
                    <Typography variant="h4">{category.category}</Typography>
                    <EventList key={category.id} category={category.category} />
                </div>
            ))}
        </div>
    );
}
