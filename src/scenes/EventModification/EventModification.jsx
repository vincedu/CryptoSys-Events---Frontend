import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useHistory, useParams } from 'react-router-dom';
import { PageContainer, CenteredCircularProgress } from '@components';
import { EVENT_BY_ID_QUERY } from '@graphql/queries';
import { AuthContext } from '@providers';
import EventTicketsModification from './components/EventTicketsModification';
import EventGeneralModification from './components/EventGeneralModification';

const EventModification = () => {
    const { t } = useTranslation();
    const history = useHistory();
    const { eventId } = useParams();
    const { userId } = useContext(AuthContext);

    const eventQuery = useQuery(EVENT_BY_ID_QUERY, {
        variables: { id: eventId },
        fetchPolicy: 'network-only',
    });

    const goBackToManageEvents = () => {
        history.push('/userProfile/manageEvents');
    };

    if (eventQuery.data && eventQuery.data.eventById) {
        if (eventQuery.data.eventById.createdBy === userId) {
            return (
                <PageContainer title={t('modifyEvent.title')}>
                    <Grid item xs={12} style={{ margin: 'auto' }}>
                        <Switch>
                            <Route path="/modifyEvent/:eventId/general">
                                <EventGeneralModification onExit={goBackToManageEvents} />
                            </Route>
                            <Route path="/modifyEvent/:eventId/tickets">
                                <EventTicketsModification onExit={goBackToManageEvents} />
                            </Route>
                        </Switch>
                    </Grid>
                </PageContainer>
            );
        }

        return <Redirect to="/unauthorized" />;
    }

    return <CenteredCircularProgress />;
};

export default EventModification;
