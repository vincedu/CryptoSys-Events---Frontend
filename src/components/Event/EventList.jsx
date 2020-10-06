import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EventItem from './EventItem';

const useStyles = makeStyles({
    seeMoreBtn: {
        padding: 30,
    },
});

export default function EventList(props) {
    const classes = useStyles();

    // Fetch events from DB
    // TODO potentiellement à changer de file
    function FetchEvents(category) {
        /* Expected JSON format for events
    events = [
      {
        id: int
        name: string
        description: string
        category: string/enum?
        format: string/enum?
        location: string
        date: date
        tickets: {...}
        tags: [string]
        image: URL
      },...
    ]
*/
        if (category === 'Live Concert') {
            return [
                {
                    id: 1,
                    name: 'Electronic music',
                    description: 'Electronic music event blablabla',
                    category: 'Live concert',
                    format: 'Live concert',
                    location: 'Montreal Bell Center',
                    date: 'October 12, 2020',
                    tickets: [{}],
                    tags: ['Live', 'Electro', 'Dance', 'Music'],
                    image: 'https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png',
                },
                {
                    id: 2,
                    name: 'African music',
                    description: 'African music event blablabla',
                    category: 'Live concert',
                    format: 'Live concert',
                    location: 'Montreal Bell Center',
                    date: 'October 13, 2020',
                    tickets: [{}],
                    tags: ['Live', 'African', 'Dance', 'Music'],
                    image: 'https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png',
                },
                {
                    id: 3,
                    name: 'Dance music',
                    description: 'Dance music event blablabla',
                    category: 'Live concert',
                    format: 'Live concert',
                    location: 'Montreal Bell Center',
                    date: 'October 13, 2020',
                    tickets: [{}],
                    tags: ['Live', 'Dance', 'Music'],
                    image: 'https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png',
                },
            ];
        }
        if (category === 'Virtual Concert') {
            return [
                {
                    id: 4,
                    name: 'Virtual Electronic music',
                    description: 'Electronic music event blablabla',
                    category: 'Live concert',
                    format: 'Live concert',
                    location: 'Montreal Bell Center',
                    date: 'October 12, 2020',
                    tickets: [{}],
                    tags: ['Live', 'Electro', 'Dance', 'Music'],
                    image: 'https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png',
                },
                {
                    id: 5,
                    name: 'Virtual African music',
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu lobortis magna. Suspendisse ullamcorper tempus est vitae fringilla. Sed non tellus nibh. Curabitur egestas fringilla erat, porta venenatis mi malesuada non. Donec et magna quis lorem commodo eleifend nec non neque. Morbi dignissim dolor non est cursus gravida. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed venenatis, ligula sit amet sodales commodo, turpis libero efficitur eros, sit amet ultrices velit purus aliquam mauris.',
                    category: 'Live concert',
                    format: 'Live concert',
                    location: 'Montreal Bell Center',
                    date: 'October 13, 2020',
                    tickets: [{}],
                    tags: ['Live', 'African', 'Dance', 'Music'],
                    image: 'https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png',
                },
                {
                    id: 6,
                    name: 'Virtual Dance music',
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu lobortis magna. Suspendisse ullamcorper tempus est vitae fringilla. Sed non tellus nibh.',
                    category: 'Live concert',
                    format: 'Live concert',
                    location: 'Montreal Bell Center',
                    date: 'October 13, 2020',
                    tickets: [{}],
                    tags: ['Live', 'Dance', 'Music'],
                    image: 'https://miro.medium.com/max/1400/0*RE_lW738kmA3SuW2.png',
                },
            ];
        }
    }

    EventList.propTypes = {
        category: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    };

    const events = FetchEvents(props.category);

    if (events !== undefined) {
        return (
            <div>
                <Grid container spacing={3} direction="row" justify="flex-start" alignItems="stretch">
                    {events.map((event) => (
                        <EventItem
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            description={event.description}
                            date={event.date}
                            image={event.image}
                        />
                    ))}
                </Grid>
                <div className={classes.seeMoreBtn}>
                    {/* TODO Put link to specific category */}
                    <Button variant="outlined" component={RouterLink} to={`/category/${props.id}`}>
                        See More {props.category}
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <div>
            <Typography variant="h5">No event in category</Typography>
        </div>
    );
}
