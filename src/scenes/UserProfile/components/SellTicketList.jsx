import React from 'react';
import { PageContainer, TitledPaper } from '@components';
import { CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TicketEvent from './TicketEvent';

export default function SellTicketList(props) {
    const { t } = useTranslation();
    const { tickets, loading } = props;
    let eventsTickets;
    if (tickets) {
        eventsTickets = tickets;
    }
    return (
        <PageContainer>
            <TitledPaper title={t('ticketList.myTicketsForSale')}>
                <div>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <div>
                            {eventsTickets === undefined || eventsTickets.length === 0 ? (
                                <Typography variant="h5">{t('ticketList.noTickets')}</Typography>
                            ) : (
                                eventsTickets.map((ticketGroup) => (
                                    <TicketEvent key={ticketGroup.event.name} eventTickets={ticketGroup} forSale />
                                ))
                            )}
                        </div>
                    )}
                </div>
            </TitledPaper>
        </PageContainer>
    );
}

SellTicketList.propTypes = {
    loading: PropTypes.bool.isRequired,
    tickets: PropTypes.array.isRequired,
};
