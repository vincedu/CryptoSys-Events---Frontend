import React, { useContext } from 'react';
import { TitledPaper, PageContainer } from '@components';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Typography, Grid, CircularProgress } from '@material-ui/core';
import { EVENTS_BY_IDS_QUERY } from '@graphql/queries';
import { AuthContext } from '@providers';
import EventItem from '../../MainPage/components/EventItem';

const Liked = () => {
    const { userData } = useContext(AuthContext);
    const { t } = useTranslation();
    const { data, loading, refetch } = useQuery(EVENTS_BY_IDS_QUERY, {
        variables: { ids: userData.liked },
        fetchPolicy: 'network-only',
    });

    if (loading) {
        return <CircularProgress />;
    }
    return (
        <PageContainer>
            <TitledPaper title={t('liked.title')}>
                {data.eventsByIds.length ? (
                    <Grid container spacing={3} justify="flex-start" alignItems="stretch">
                        {data.eventsByIds.map((event) => (
                            <EventItem
                                key={event.id}
                                id={event.id}
                                name={event.name}
                                description={event.description}
                                date={event.startDate}
                                image={event.image}
                                type={event.type}
                                languages={event.languages}
                                tags={event.tags}
                                onLike={refetch}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="h4">{t('liked.noEvent')}</Typography>
                )}
            </TitledPaper>
        </PageContainer>
    );
};

Liked.propTypes = {};

export default Liked;
