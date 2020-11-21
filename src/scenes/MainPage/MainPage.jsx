import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID_QUERY } from '@graphql/queries';
import { PageContainer } from '@components';
import { CATEGORIES } from '@scenes/EventCreation/lists';
import EventList from './components/EventList';
import MainEventItem from './components/MainEventItem';
import MainPageHeader from './components/MainPageHeader';

const MainPage = () => {
    const mainEvent = useQuery(EVENT_BY_ID_QUERY, { variables: { id: '5fb54e8ad314f47f6c16be43' } });
    function FetchCategories() {
        return CATEGORIES.map((name, id) => {
            return { id, name };
        });
    }
    const categories = FetchCategories();

    return (
        <>
            <MainPageHeader />
            <PageContainer>
                <div />
                {mainEvent.loading ? <CircularProgress /> : null}
                {mainEvent.data?.eventById ? (
                    <MainEventItem
                        id={mainEvent.data.eventById.id}
                        name={mainEvent.data.eventById.name}
                        description={mainEvent.data.eventById.description}
                        date={mainEvent.data.eventById.startDate}
                        type={mainEvent.data.eventById.type}
                        image={mainEvent.data.eventById.image}
                        tags={mainEvent.data.eventById.tags}
                        languages={mainEvent.data.eventById.languages}
                    />
                ) : null}
                {categories.map((category) => (
                    <EventList key={category.id} category={category.name} id={category.id} />
                ))}
            </PageContainer>
        </>
    );
};

export default MainPage;
