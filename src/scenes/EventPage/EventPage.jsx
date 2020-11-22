import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID_QUERY, TICKET_SALES_BY_EVENT_IDS_QUERY } from '@graphql/queries';
import { NFTContext } from '@providers';
import {
    Button,
    makeStyles,
    Typography,
    CircularProgress,
    Grid,
    ListItemText,
    Avatar,
    ListItem,
    ListItemAvatar,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LanguageIcon from '@material-ui/icons/Language';
import DescriptionIcon from '@material-ui/icons/Description';
import ClassIcon from '@material-ui/icons/Class';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import CheckoutDialog from './components/CheckoutDialog';

const useStyles = makeStyles((theme) => ({
    event: {
        backgroundColor: theme.palette.secondary.main,
        height: '400px',
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

const EventPage = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { buyTicketNFTs } = useContext(NFTContext);
    const classes = useStyles();
    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    const { data, loading } = useQuery(EVENT_BY_ID_QUERY, { variables: { id } });
    const ticketsQuery = useQuery(TICKET_SALES_BY_EVENT_IDS_QUERY, {
        variables: { eventIds: [id] },
    });

    const handleBuyTicket = async (newTickets, otherTickets, total) => {
        await buyTicketNFTs(newTickets, otherTickets, total);
    };

    const displayVenue = () => {
        if (data.eventById.location.type === 'venue') {
            return data.eventById.location.location;
        }
        return t(data.eventById.location.type);
    };

    if (loading || ticketsQuery.loading) {
        return <CircularProgress />;
    }

    if (data) {
        const newTickets = {};
        const otherTickets = {};
        ticketsQuery.data.ticketSalesByEventIds[0].original.forEach((originalTicket) => {
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
        ticketsQuery.data.ticketSalesByEventIds[0].resale.forEach((resaleTicket) => {
            resaleTicket.sales.forEach((sale) => {
                otherTickets[sale.saleId] = {
                    id: sale.saleId,
                    name: resaleTicket.template.name,
                    description: resaleTicket.template.description,
                    quantity: 1,
                    price: sale.price.amount,
                    image: resaleTicket.template.image,
                };
            });
        });
        return (
            <div style={{ padding: 20 }}>
                <Grid container justify="center" className={classes.event}>
                    <div style={{ height: '50px' }}>
                        <div
                            className={classes.media}
                            style={{ backgroundImage: `url('${data.eventById.image}'`, height: '50px' }}
                            alt="Event"
                        />
                    </div>
                    <Grid item xs={11} md={6} style={{ paddingRight: 25, height: '400px' }}>
                        <div style={{ height: '100%' }}>
                            <div
                                className={classes.media}
                                style={{ backgroundImage: `url('${data.eventById.image}'` }}
                                alt="Event"
                            />
                        </div>
                        <Typography variant="h2" style={{ paddingTop: 25 }}>
                            {data.eventById.name}
                        </Typography>
                        <br />

                        <div className={classes.root}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <DescriptionIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Description" secondary={data.eventById.description} />
                                    </ListItem>
                                </Grid>
                                <Grid item xs style={{ marginTop: '10px' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <EventIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Date"
                                            secondary={moment(data.eventById.startDate).format('LLLL')}
                                        />
                                    </ListItem>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LocationOnIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Location" secondary={displayVenue()} />
                                    </ListItem>
                                </Grid>
                                <Grid item xs style={{ marginTop: '10px' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <ClassIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Category" secondary={data.eventById.category} />
                                    </ListItem>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LanguageIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Languages" secondary={data.eventById.languages} />
                                    </ListItem>
                                </Grid>
                                <Grid item xs>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <LocalOfferIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Tags" secondary={data.eventById.tags} />
                                    </ListItem>
                                </Grid>
                            </Grid>
                        </div>
                        <Button
                            variant="outlined"
                            color="secondary"
                            style={{ float: 'right', margin: 20 }}
                            onClick={() => setIsTicketDialogOpen(true)}
                        >
                            {t('buyTickets.tickets')}
                        </Button>
                    </Grid>
                </Grid>
                <CheckoutDialog
                    isOpen={isTicketDialogOpen}
                    onSubmit={handleBuyTicket}
                    onClose={() => setIsTicketDialogOpen(false)}
                    newTickets={newTickets}
                    otherTickets={otherTickets}
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
