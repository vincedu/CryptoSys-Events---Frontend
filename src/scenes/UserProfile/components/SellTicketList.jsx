import React from 'react';
import { PageContainer, TitledPaper } from '@components';
import { CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TicketEvent from './TicketEvent';

export default function SellTicketList(props) {
    const { t } = useTranslation();
    const { tickets, loading, refetch } = props;

    if (loading) return <CircularProgress />;

    let eventsTickets;
    if (tickets) {
        eventsTickets = tickets;
    }
    return (
        <PageContainer>
            <TitledPaper title={t('ticketList.myTicketsForSale')}>
                {eventsTickets && eventsTickets.length ? (
                    eventsTickets.map((ticketGroup) => (
                        <TicketEvent
                            {...props}
                            key={ticketGroup.event.name}
                            eventTickets={ticketGroup}
                            refetch={refetch}
                            forSale
                        />
                    ))
                ) : (
                    <Typography variant="h5">{t('ticketList.noTickets')}</Typography>
                )}
            </TitledPaper>
        </PageContainer>
    );
}

SellTicketList.propTypes = {
    loading: PropTypes.bool.isRequired,
    tickets: PropTypes.array.isRequired,
    refetch: PropTypes.func.isRequired,
};
