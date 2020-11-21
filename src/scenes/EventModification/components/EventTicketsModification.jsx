import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { TICKET_TEMPLATES_BY_EVENT_ID_QUERY } from '@graphql/queries';
import { LINK_NFT_TEMPLATES_TO_EVENT_MUTATION, PIN_TICKET_IMAGE_TO_IPFS_MUTATION } from '@graphql/mutations';
import { NFTContext } from '@providers';
import { EventTicketsForm, CenteredCircularProgress } from '@components';
import { DEFAULT_TICKET_IMAGE_IPFS_HASH } from '@constants';

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
    const [pinTicketImageMutation] = useMutation(PIN_TICKET_IMAGE_TO_IPFS_MUTATION);
    const [linkNftTemplatesToEvent] = useMutation(LINK_NFT_TEMPLATES_TO_EVENT_MUTATION);
    const { createTicketNFTs } = useContext(NFTContext);

    const handleCreateTicket = async (ticket) => {
        let ticketImageIpfsHash = DEFAULT_TICKET_IMAGE_IPFS_HASH;
        if (ticket.image) {
            const pinTicketImageResult = await pinTicketImageMutation({
                variables: { file: ticket.image, ticketName: ticket.name, eventName: eventId },
            });
            ticketImageIpfsHash = pinTicketImageResult.data.pinTicketImageToIpfs.ipfsHash;
        }

        const ticketNFTs = [
            {
                ticketData: {
                    name: ticket.name,
                    description: ticket.description,
                    eventId,
                    image: ticketImageIpfsHash,
                },
                maxSupply: ticket.quantity,
                price: ticket.price,
            },
        ];

        const { templateIds } = await createTicketNFTs(ticketNFTs);
        await linkNftTemplatesToEvent({ variables: { eventId, templateIds } });
        setTickets([...tickets, ticket]);
    };

    if (existingTicketsQuery.data && existingTicketsQuery.data.ticketTemplatesByEventId && !tickets) {
        const existingTickets = existingTicketsQuery.data.ticketTemplatesByEventId.map((ticketData) => ({
            name: ticketData.name,
            description: ticketData.description,
            image: ticketData.image,
            quantity: ticketData.maxSupply,
        }));

        setTickets(existingTickets);
    }

    if (tickets) {
        return (
            <>
                <EventTicketsForm tickets={tickets} onCreateTicket={handleCreateTicket} />{' '}
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
