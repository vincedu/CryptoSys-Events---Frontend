import React from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress, makeStyles, Typography, Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { EVENTS_BY_IDS_QUERY, DISTINCT_QUERY } from '@graphql/queries';
import { PageContainer } from '@components';
import EventList from './components/EventList';
import SpecialEventItem from './components/SpecialEventItem';
import MainPageHeader from './components/MainPageHeader';

const useStyles = makeStyles((theme) => ({
    horizontalLine: {
        margin: 30,
        border: 0,
        height: 1,
        backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(214, 108, 68, 0.75), rgba(0, 0, 0, 0))',
    },
    categoryTitle: {
        margin: 20,
        textAlign: 'left',
        width: 'fit-content',
        fontFamily: `'Bebas Neue', sans-serif`,
    },
    listContainer: {
        dilplay: 'flex',
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
}));

const MainPage = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    const ids = ['5fb54e8ad314f47f6c16be43', '5fb559d5d439e40df74ac907'];

    const featuredEvents = useQuery(EVENTS_BY_IDS_QUERY, { variables: { ids }, fetchPolicy: 'network-only' });

    const categories = useQuery(DISTINCT_QUERY, { variables: { attribute: 'category' }, fetchPolicy: 'network-only' });
    return (
        <>
            <MainPageHeader />
            <PageContainer>
                {featuredEvents.loading ? <CircularProgress /> : null}
                {featuredEvents.data?.eventsByIds.length ? (
                    <div className={classes.listContainer}>
                        <Typography className={classes.categoryTitle} variant="h3" color="secondary">
                            {t('eventList.featured')}
                        </Typography>
                        <Grid container spacing={3}>
                            {featuredEvents.data.eventsByIds.map((event) => (
                                <SpecialEventItem
                                    key={event.id}
                                    id={event.id}
                                    name={event.name}
                                    description={event.description}
                                    date={event.startDate}
                                    type={event.type}
                                    image={event.image}
                                    tags={event.tags}
                                    languages={event.languages}
                                />
                            ))}
                        </Grid>
                    </div>
                ) : null}
                {categories.loading ? <CircularProgress /> : null}
                {categories.data?.distinct.length
                    ? categories.data.distinct
                          .map((category) => <EventList key={category} category={category} />)
                          .reduce((prev, curr) => [prev, <hr className={classes.horizontalLine} key={null} />, curr])
                    : null}
            </PageContainer>
        </>
    );
};

MainPage.propTypes = {};

export default MainPage;
