import React from 'react';
import { PageContainer, TitledPaper } from '@components';
import { CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TicketEvent from './TicketEvent';

export default function MyTicketList(props) {
    const { t } = useTranslation();

    const { tickets, loading, myTickets, refetch } = props;

    if (loading) return <CircularProgress />;

    let upcomingEventsTickets;
    let pastEventsTickets;
    if (tickets) {
        upcomingEventsTickets = tickets.upcoming;
        pastEventsTickets = tickets.past;
    }
    return (
        <PageContainer>
            <TitledPaper title={t('ticketList.myTickets')}>
                <TitledPaper title={t('ticketList.upcoming')}>
                    {upcomingEventsTickets && upcomingEventsTickets.length ? (
                        upcomingEventsTickets.map((upcomingEventTickets) => (
                            <TicketEvent
                                key={upcomingEventTickets.event.name}
                                eventTickets={upcomingEventTickets}
                                myTickets={myTickets}
                                refetch={refetch}
                            />
                        ))
                    ) : (
                        <Typography variant="h5">{t('ticketList.noTickets')}</Typography>
                    )}
                </TitledPaper>
                <TitledPaper title={t('ticketList.past')}>
                    {pastEventsTickets && pastEventsTickets.length ? (
                        pastEventsTickets.map((pastEventTickets) => (
                            <TicketEvent
                                key={pastEventTickets.event.name}
                                eventTickets={pastEventTickets}
                                myTickets={myTickets}
                                refetch={refetch}
                            />
                        ))
                    ) : (
                        <Typography variant="h5">{t('ticketList.noTickets')}</Typography>
                    )}
                </TitledPaper>
            </TitledPaper>
        </PageContainer>
    );
}

MyTicketList.propTypes = {
    refetch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    myTickets: PropTypes.bool,
    tickets: PropTypes.shape({
        upcoming: PropTypes.array.isRequired,
        past: PropTypes.array.isRequired,
    }).isRequired,
};
MyTicketList.defaultProps = {
    myTickets: false,
};
