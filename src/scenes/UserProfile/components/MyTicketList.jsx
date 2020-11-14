import React from 'react';
import { PageContainer, TitledPaper } from '@components';
import { CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TicketEvent from './TicketEvent';

export default function MyTicketList(props) {
    const { t } = useTranslation();

    const { tickets, loading, myTickets } = props;
    let upcomingEventsTickets;
    let pastEventsTickets;
    if (tickets) {
        upcomingEventsTickets = tickets.upcoming;
        pastEventsTickets = tickets.past;
    }
    return (
        <PageContainer title={t('ticketList.myTickets')}>
            <TitledPaper title={t('ticketList.upcoming')}>
                <div>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            {upcomingEventsTickets === undefined || upcomingEventsTickets.length === 0 ? (
                                <Typography variant="h5">{t('ticketList.noTickets')}</Typography>
                            ) : (
                                upcomingEventsTickets.map((upcomingEventTickets) => (
                                    <TicketEvent
                                        key={upcomingEventTickets.event.name}
                                        eventTickets={upcomingEventTickets}
                                        myTickets={myTickets}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </TitledPaper>
            <TitledPaper title={t('ticketList.past')}>
                <div>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            {pastEventsTickets === undefined || pastEventsTickets.length === 0 ? (
                                <Typography variant="h5">{t('ticketList.noTickets')}</Typography>
                            ) : (
                                pastEventsTickets.map((pastEventTickets) => (
                                    <TicketEvent
                                        key={pastEventTickets.event.name}
                                        eventTickets={pastEventTickets}
                                        myTickets={myTickets}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </TitledPaper>
        </PageContainer>
    );
}

MyTicketList.propTypes = {
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
