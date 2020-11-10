import React, { useContext } from 'react';
import { PageContainer, TitledPaper } from '@components';
import { CircularProgress, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY } from '@graphql/queries';
import { AuthContext } from '@providers';
import TicketEvent from './TicketEvent';

export default function TicketList() {
    const { userData } = useContext(AuthContext);
    const eventsTickets = useQuery(TICKETS_FOR_EVENTS_BY_ACCOUNT_NAME_QUERY, {
        variables: { accountName: userData.walletAccountName },
    });
    let upcomingEventsTickets;
    let pastEventsTickets;
    if (eventsTickets.data) {
        upcomingEventsTickets = eventsTickets.data.ticketsForEventsByAccountName.upcoming;
        pastEventsTickets = eventsTickets.data.ticketsForEventsByAccountName.past;
    }

    return (
        <PageContainer title="My Tickets">
            <TitledPaper title="Upcoming Tickets">
                <div>
                    {eventsTickets.loading ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            {upcomingEventsTickets === undefined ? (
                                <Typography variant="h5">No Upcoming Tickets</Typography>
                            ) : (
                                upcomingEventsTickets.map((upcomingEventTickets) => (
                                    <TicketEvent
                                        key={upcomingEventTickets.event.name}
                                        eventTickets={upcomingEventTickets}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </TitledPaper>
            <TitledPaper title="Past Tickets">
                <div>
                    {eventsTickets.loading ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            {pastEventsTickets === undefined ? (
                                <Typography variant="h5">No Past Tickets</Typography>
                            ) : (
                                pastEventsTickets.map((pastEventTickets) => (
                                    <TicketEvent key={pastEventTickets.event.name} eventTickets={pastEventTickets} />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </TitledPaper>
        </PageContainer>
    );
}
