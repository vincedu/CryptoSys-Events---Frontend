import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { TICKET_TEMPLATES_BY_EVENT_ID_QUERY } from '@graphql/queries';
import { EventTicketsForm, CenteredCircularProgress } from '@components';

const useStyles = makeStyles({
    actionButtonContainer: {
        padding: '60px 16px 16px 16px',
    },
});

const EventTicketsModification = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [tickets, setTickets] = useState(undefined);
    const { eventId } = useParams();
    const existingTicketsQuery = useQuery(TICKET_TEMPLATES_BY_EVENT_ID_QUERY, {
        variables: { eventId },
        fetchPolicy: 'network-only',
    });

    const handleCreateTicket = async (ticket) => {
        setTickets([...tickets, ticket]);
    };

    if (existingTicketsQuery.data && existingTicketsQuery.data.ticketTemplatesByEventId && !tickets) {
        const existingTickets = existingTicketsQuery.data.ticketTemplatesByEventId.map((ticketData) => ({
            name: ticketData.name,
            description: ticketData.description,
            image: ticketData.image,
            quantity: ticketData.maxSupply,
            price: ticketData.originalPrice.amount,
            currency: ticketData.originalPrice.currency,
            originalSoldCount: ticketData.originalSoldCount,
        }));

        setTickets(existingTickets);
    }

    if (tickets) {
        return (
            <>
                <EventTicketsForm tickets={tickets} onCreateTicket={handleCreateTicket} eventId={eventId} />
                <Grid container justify="flex-start" className={classes.actionButtonContainer}>
                    <Button variant="outlined" color="primary" onClick={props.onExit}>
                        {t('back')}
                    </Button>
                </Grid>
            </>
        );
    }

    return <CenteredCircularProgress />;
};

EventTicketsModification.propTypes = {
    onExit: PropTypes.func.isRequired,
};

export default EventTicketsModification;
