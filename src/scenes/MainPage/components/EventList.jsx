import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { EVENTS_BY_PARAM_QUERY } from '@graphql/queries';
import { makeStyles, Grid, Typography, Button, CircularProgress, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '@providers';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

const useStyles = makeStyles(() => ({
    seeMoreBtn: {
        padding: 30,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    categoryTitle: {
        margin: 20,
        textAlign: 'left',
        width: 'fit-content',
        fontFamily: `'Bebas Neue', sans-serif`,
        '&:hover': {
            cursor: 'pointer',
        },
    },
    horizontalLine: {
        margin: 30,
        border: 0,
        height: 1,
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(214, 108, 68, 0.75), rgba(0, 0, 0, 0))',
    },
}));

const EventList = (props) => {
    const { t } = useTranslation();
    const { userData } = useContext(AuthContext);
    const classes = useStyles();
    const offset = 0;
    const limit = 4;
    const query = useQuery(EVENTS_BY_PARAM_QUERY, {
        variables: { category: props.category, offset, limit },
    });

    function loadMore() {
        const pos = window.pageYOffset;
        query
            .fetchMore({
                variables: {
                    offset: query.data.eventsByParam.length,
                },
            })
            .then(() => {
                window.scrollTo(0, pos);
            });
    }
    const handleCategory = (category) => {
        props.history.push({
            pathname: `/search/${category}`,
            state: {
                category,
            },
        });
    };

    if (query.loading) {
        return <CircularProgress />;
    }

    if (query.data.eventsByParam && query.data.eventsByParam.length) {
        return (
            <div style={{ dilplay: 'flex', padding: 20 }}>
                <Tooltip title={`${t('eventList.seeMore')} ${t(props.category)}`} placement="top" arrow>
                    <Typography
                        className={classes.categoryTitle}
                        color="secondary"
                        value={props.category}
                        variant="h3"
                        onClick={() => handleCategory(props.category)}
                    >
                        {t(props.category)}
                    </Typography>
                </Tooltip>
                <Grid container spacing={3}>
                    {query.data.eventsByParam.map((event) => (
                        <EventItem
                            key={event.id}
                            id={event.id}
                            name={event.name}
                            tags={event.tags}
                            languages={event.languages}
                            description={event.description}
                            date={event.startDate}
                            image={event.image}
                            type={event.type}
                            liked={userData?.liked?.includes(event.id)}
                        />
                    ))}
                </Grid>
                <div className={classes.seeMoreBtn}>
                    <Button variant="outlined" color="secondary" onClick={() => loadMore()}>
                        {t('eventList.seeMore')} {t(props.category)}
                    </Button>
                </div>
            </div>
        );
    }
    return null;
};

EventList.propTypes = {
    category: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(EventList);
