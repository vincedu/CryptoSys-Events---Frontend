import React from 'react';
import { useQuery } from '@apollo/client';
import { EVENTS_BY_PARAM_QUERY } from '@graphql/queries';
import { makeStyles, Grid, Typography, Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

const useStyles = makeStyles((theme) => ({
    seeMoreBtn: {
        padding: 30,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    categoryTitle: {
        padding: 20,
        textAlign: 'left',
        color: theme.palette.secondary.main,
        fontFamily: `'Bebas Neue', sans-serif`,
    },
    horizontalLine: {
        margin: 30,
        border: 0,
        height: 1,
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(214, 108, 68, 0.75), rgba(0, 0, 0, 0))',
    },
}));

const EventList = (props) => {
    const classes = useStyles();
    const offset = 0;
    const limit = 4;
    const query = useQuery(EVENTS_BY_PARAM_QUERY, {
        variables: { category: props.category, offset, limit },
    });

    function loadMore() {
        query.fetchMore({
            variables: {
                offset: query.data.eventsByParam.length,
            },
        });
    }

    if (query.loading) {
        return <CircularProgress />;
    }

    if (query.data.eventsByParam && query.data.eventsByParam.length) {
        return (
            <div>
                <Typography className={classes.categoryTitle} variant="h3">
                    {props.category}
                </Typography>
                <Grid container spacing={3} direction="row" justify="flex-start" alignItems="stretch">
                    {query.data.eventsByParam.map((event) => (
                        <EventItem
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            description={event.description}
                            date={event.startDate.substring(0, 10)}
                            image={event.image}
                            type={event.type}
                        />
                    ))}
                </Grid>
                <div className={classes.seeMoreBtn}>
                    <Button variant="outlined" color="secondary" onClick={() => loadMore()}>
                        See More {props.category}
                    </Button>
                </div>
                <hr className={classes.horizontalLine} />
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
};

export default EventList;
