import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import EventList from './components/EventList';
import MainEventItem from './components/MainEventItem';

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
    const mainEvent = {
        id: 1,
        name: 'Electronic music',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu lobortis magna. Suspendisse ullamcorper tempus est vitae fringilla. Sed non tellus nibh. Curabitur egestas fringilla erat, porta venenatis mi malesuada non. Donec et magna quis lorem commodo eleifend nec non neque. Morbi dignissim dolor non est cursus gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed venenatis, ligula sit amet sodales commodo, turpis libero efficitur eros, sit amet ultrices velit purus aliquam mauris.',
        category: 'Live concert',
        format: 'Live concert',
        location: 'Montreal Bell Center',
        date: 'October 12, 2020',
        tickets: [{}],
        tags: ['Live', 'Electro', 'Dance', 'Music'],
        image: 'https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png',
    };

    return (
        <div className={classes.eventListContainer}>
            {/* Alert */}
            <Alert severity="warning" component={RouterLink} to="/covid" style={{ textDecoration: 'none' }}>
                See our latest COVID-19 ressources to stay safe and manage your events
            </Alert>

            {/* Main Event */}
            <div className={classes.eventListContainer}>
                <Typography className={classes.categoryTitle} variant="h4">
                    Main Event
                </Typography>
                <hr className={classes.horizontalLine} />

                <MainEventItem
                    id={mainEvent.id}
                    name={mainEvent.name}
                    description={mainEvent.description}
                    date={mainEvent.date}
                    image={mainEvent.image}
                />
            </div>

            {/* Event Lists by category */}
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
