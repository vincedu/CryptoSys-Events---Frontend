import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

export default function EventList(props) {
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
                    id: 6,
                    name: 'Virtual Dance music',
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
    }

    EventList.propTypes = {
        category: PropTypes.string.isRequired,
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
            </div>
        );
    }
    return (
        <div>
            <Typography variant="h5">No event in category</Typography>
        </div>
    );
}
