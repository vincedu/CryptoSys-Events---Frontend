import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID_QUERY, TICKET_SALES_BY_EVENT_ID_QUERY } from '@graphql/queries';
import { NFTContext } from '@providers';
import { Button, makeStyles, Typography, CircularProgress, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import CheckoutDialog from './components/CheckoutDialog';

const useStyles = makeStyles((theme) => ({
    imageBackground: {
        backgroundImage: `url('https://eosnation.io/wp-content/uploads/2019/02/2018-07-26_19.16.59.jpg')`,
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: '5%',
    },
    event: {
        padding: 20,
    },
    media: {
        display: 'block',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        maxWidth: '100%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            height: 0,
            paddingTop: '56.25%',
        },
    },
}));

const EventPage = (props) => {
    const { t } = useTranslation();
    const { buyTicketNFTs } = useContext(NFTContext);

    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    // Query Item by ID
    const { data, loading } = useQuery(EVENT_BY_ID_QUERY, { variables: { id: props.location.state.id } });
    const ticketsQuery = useQuery(TICKET_SALES_BY_EVENT_ID_QUERY, {
        variables: { eventId: props.location.state.id },
    });
    const handleOpenTicketDialog = () => {
        setIsTicketDialogOpen(true);
    };

    const handleCloseTicketDialog = () => {
        setIsTicketDialogOpen(false);
    };

    const handleBuyTicket = async (newTickets, otherTickets, total) => {
        await buyTicketNFTs(newTickets, otherTickets, total);
    };

    EventPage.propTypes = {
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
            state: PropTypes.shape({
                id: PropTypes.string.isRequired,
            }),
        }),
    };

    EventPage.defaultProps = {
        location: {
            pathname: '',
            state: {
                id: '',
            },
        },
    };

    const classes = useStyles();

    if (loading || ticketsQuery.loading) {
        return <CircularProgress />;
    }

    if (data !== undefined) {
        const newTickets = {};
        ticketsQuery.data.ticketSalesByEventId.original.forEach((originalTicket) => {
            newTickets[originalTicket.template.templateId] = {
                id: originalTicket.template.templateId,
                name: originalTicket.template.name,
                description: originalTicket.template.description,
                quantity: originalTicket.sales.length,
                price: originalTicket.sales.length > 0 ? originalTicket.sales[0].price.amount : undefined,
                image: originalTicket.template.image,
                saleIds: originalTicket.sales.map((sale) => sale.saleId),
            };
        });
        return (
            <div style={{ padding: 20 }}>
                <Grid container direction="row" justify="center">
                    <Grid item xs={11} md={6} style={{ paddingRight: 25 }}>
                        <div style={{ height: '100%' }}>
                            <div
                                className={classes.media}
                                style={{ backgroundImage: `url('${data.eventById.image}'` }}
                                alt="Event"
                            />
                        </div>
                    </Grid>
                    <Grid item xs={11} md={5}>
                        <Typography variant="h2">{data.eventById.name}</Typography>
                        <Typography variant="subtitle1">{data.eventById.startDate.substring(0, 10)}</Typography>
                        <br />
                        <Typography variant="subtitle1">{data.eventById.description}</Typography>
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={{ float: 'right', margin: 20 }}
                            onClick={handleOpenTicketDialog}
                        >
                            {t('buyTickets.tickets')}
                        </Button>
                    </Grid>
                </Grid>
                <CheckoutDialog
                    isOpen={isTicketDialogOpen}
                    onSubmit={handleBuyTicket}
                    onClose={handleCloseTicketDialog}
                    newTickets={newTickets}
                    otherTickets={{}}
                    event={data.eventById}
                />
            </div>
        );
    }

    return (
        <div>
            {/* TODO Fix error page when event not found */}
            <Typography variant="h3">Error with event</Typography>
        </div>
    );
};

export default EventPage;
