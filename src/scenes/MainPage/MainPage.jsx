import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { DISTINCT_QUERY } from '@graphql/queries';
import { PageContainer } from '@components';
import EventList from './components/EventList';
import MainPageHeader from './components/MainPageHeader';

const useStyles = makeStyles(() => ({
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
}));

const MainPage = () => {
    const classes = useStyles();

    const categories = useQuery(DISTINCT_QUERY, { variables: { attribute: 'category' }, fetchPolicy: 'network-only' });
    const categoriesToShow = [
        'Music',
        'Hobbies & Special Interest',
        'Science & Technology',
        'Seasonal & Holiday',
        'Charity & Causes',
    ];
    return (
        <>
            <MainPageHeader />
            <PageContainer>
                {categories.loading ? <CircularProgress /> : null}
                {categories.data?.distinct.length
                    ? categoriesToShow
                          .filter((value) => categories.data.distinct.includes(value))
                          .map((category) => <EventList key={category} category={category} />)
                          .reduce((prev, curr) => [prev, <hr className={classes.horizontalLine} key={null} />, curr])
                    : null}
            </PageContainer>
        </>
    );
};

MainPage.propTypes = {};

export default MainPage;
