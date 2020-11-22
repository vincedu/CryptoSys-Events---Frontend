import React, { useContext } from 'react';
import { TitledPaper, PageContainer } from '@components';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { Typography, CircularProgress, Grid } from '@material-ui/core';
import { EVENTS_BY_IDS_QUERY } from '@graphql/queries';
import { AuthContext } from '@providers';
import EventItem from '../../MainPage/components/EventItem';

const Liked = () => {
    const { userData } = useContext(AuthContext);
    const { t } = useTranslation();
    const { data, loading } = useQuery(EVENTS_BY_IDS_QUERY, { variables: { ids: userData.liked } });

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
                                withBanner
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
