import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import { EVENTS_QUERY } from '@graphql/queries';
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

const EventList = (props) => {
    const classes = useStyles();
    const { data, loading } = useQuery(EVENTS_QUERY);

    if (loading) {
        return <CircularProgress />;
    }

    const events = data.events;

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
                            date={event.startDate.substring(0, 10)}
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
};

EventList.propTypes = {
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};

export default EventList;
