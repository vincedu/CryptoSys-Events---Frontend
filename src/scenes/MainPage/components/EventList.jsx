import React, { useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { EVENTS_BY_PARAM_QUERY } from '@graphql/queries';
import { makeStyles, Grid, Typography, Button, CircularProgress, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '@providers';
import PropTypes from 'prop-types';
import EventItem from './EventItem';

const useStyles = makeStyles((theme) => ({
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
    listContainer: {
        dilplay: 'flex',
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
}));

const EventList = (props) => {
    const { t } = useTranslation();
    const { userData } = useContext(AuthContext);
    const history = useHistory();
    const classes = useStyles();
    const [isMore, setIsMore] = useState(true);
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
            .then((result) => {
                if (result.data.eventsByParam.length) {
                    window.scrollTo(0, pos);
                    if (result.data.eventsByParam.length < 4) setIsMore(false);
                } else setIsMore(false);
            });
    }
    const handleCategory = (category) => {
        history.push({
            pathname: `/search/${category}`,
            state: {
                category,
            },
        });
    };

    if (query.loading) {
        return <CircularProgress />;
    }

    if (query.data.eventsByParam?.length) {
        return (
            <div className={classes.listContainer}>
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
                    <Button variant="outlined" color="secondary" disabled={!isMore} onClick={loadMore}>
                        {isMore ? t('eventList.seeMore') : t('eventList.noMore')} {t(props.category)}
                    </Button>
                </div>
            </div>
        );
    }
    return null;
};

EventList.propTypes = {
    category: PropTypes.string.isRequired,
};

export default EventList;
