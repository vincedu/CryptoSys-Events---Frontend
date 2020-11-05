import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID_QUERY } from '@graphql/queries';
import { PageContainer } from '@components';
import { CATEGORIES } from '@scenes/EventCreation/lists';
import EventList from './components/EventList';
import MainEventItem from './components/MainEventItem';
import CustomSearchBar from './components/CustomSearchBar';

const useStyles = makeStyles(() => ({
    eventListContainer: {
        padding: 20,
    },
}));

const EventListContainer = () => {
    const classes = useStyles();

    const mainEvent = useQuery(EVENT_BY_ID_QUERY, { variables: { id: '5f7cdafa185b45811f996ca5' } });

    // TODO Fetch categories from DB?
    function FetchCategories() {
        return CATEGORIES.map((name, id) => {
            return { id, name };
        });
    }
    const categories = FetchCategories();

    return (
        <>
            <CustomSearchBar />
            <PageContainer>
                {/* Main Event */}
                <div className={classes.eventListContainer}>
                    {mainEvent.loading ? (
                        <CircularProgress />
                    ) : (
                        <MainEventItem
                            id={mainEvent.data.eventById.id}
                            name={mainEvent.data.eventById.name}
                            description={mainEvent.data.eventById.description}
                            date={mainEvent.data.eventById.startDate}
                            type={mainEvent.data.eventById.type}
                            image={mainEvent.data.eventById.image}
                        />
                    )}
                </div>

                {/* Event Lists by category */}
                {categories.map((category) => (
                    <div className={classes.eventListContainer} key={category.id}>
                        <EventList category={category.name} id={category.id} />
                    </div>
                ))}
            </PageContainer>
        </>
    );
};

export default EventListContainer;
