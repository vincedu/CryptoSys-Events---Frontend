import React, { useState, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID_QUERY, TICKET_SALES_BY_EVENT_IDS_QUERY } from '@graphql/queries';
import { NFTContext } from '@providers';
import {
    Button,
    makeStyles,
    Typography,
    Grid,
    ListItemText,
    Avatar,
    ListItem,
    ListItemAvatar,
} from '@material-ui/core';
import { CenteredCircularProgress } from '@components';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LanguageIcon from '@material-ui/icons/Language';
import ClassIcon from '@material-ui/icons/Class';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import CheckoutDialog from './components/CheckoutDialog';

const useStyles = makeStyles((theme) => ({
    event: {
        backgroundColor: theme.palette.secondary.main,
        width: '100%',
    },
    media: {
        height: '100%',
        backgroundSize: 'cover',
    },
    categoryTitle: {
        color: theme.palette.secondary.main,
        fontFamily: `'Bebas Neue', sans-serif`,
        paddingTop: 25,
        paddingBottom: 12,
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

    const displayLocation = () => {
        if (data.eventById.location.type === 'venue' || data.eventById.location.type === 'online') {
            return data.eventById.location.location;
        }
        return t(data.eventById.location.type);
    };

    if (loading || ticketsQuery.loading) {
        return <CenteredCircularProgress />;
    }

    if (data && ticketsQuery.data) {
        const isOnlineEvent = data.eventById.location.type === 'online';
        const newTickets = {};
        const otherTickets = {};
        ticketsQuery.data.ticketSalesByEventIds[0].original.forEach((originalTicket) => {
            newTickets[originalTicket.template.templateId] = {
                id: originalTicket.template.templateId,
                name: originalTicket.template.name,
                seller: originalTicket.template.creator,
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
                    seller: sale.seller,
                    description: resaleTicket.template.description,
                    quantity: 1,
                    price: sale.price.amount,
                    image: resaleTicket.template.image,
                };
            });
        });
        return (
            <div style={{ padding: 20 }}>
                <Grid container justify="center">
                    <Grid item xs={12} sm={11} className={classes.event}>
                        <Grid container>
                            <Grid item xs={12} sm={7} style={{ margin: 'auto' }}>
                                <div
                                    className={classes.media}
                                    style={{ backgroundImage: `url('${data.eventById.image}'`, height: 400 }}
                                    alt="Event"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={11} sm={7}>
                        <Typography variant="h2" className={classes.categoryTitle}>
                            {data.eventById.name}
                        </Typography>
                        <Typography>{data.eventById.description}</Typography>
                        <br />
                        <Grid container spacing={1}>
                            <ListItem style={{ height: '100%', margin: 'auto', flex: 1 }}>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={t('eventPage.organizer')}
                                    secondary={data.eventById.createdByDisplayName}
                                />
                            </ListItem>
                            <ListItem style={{ height: '100%', margin: 'auto', flex: 1 }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <EventIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={t('createEvent.date.title')}
                                    secondary={moment(data.eventById.startDate).format('yyyy-MM-DD HH:mm')}
                                />
                            </ListItem>
                        </Grid>
                        <Grid container spacing={1}>
                            <ListItem style={{ height: '100%', margin: 'auto', flex: 1 }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LocationOnIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        isOnlineEvent
                                            ? t('createEvent.location.eventLink')
                                            : t('createEvent.location.title')
                                    }
                                    secondary={displayLocation()}
                                />
                            </ListItem>
                            <ListItem style={{ height: '100%', margin: 'auto', flex: 1 }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ClassIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={t('createEvent.generalInfo.category')}
                                    secondary={data.eventById.category}
                                />
                            </ListItem>
                        </Grid>
                        <Grid container spacing={1}>
                            <ListItem style={{ height: '100%', margin: 'auto', flex: 1 }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LanguageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={t('createEvent.generalInfo.languages')}
                                    secondary={data.eventById.languages.join(' ')}
                                />
                            </ListItem>
                            <ListItem style={{ height: '100%', margin: 'auto', flex: 1 }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ClassIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={t('eventList.type')} secondary={data.eventById.type} />
                            </ListItem>
                        </Grid>
                        <Grid container spacing={1}>
                            <ListItem style={{ height: '100%', margin: 'auto', flex: 1 }}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LocalOfferIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={t('searchPage.tags')}
                                    secondary={data.eventById.tags.join(' ')}
                                />
                            </ListItem>
                        </Grid>
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

EventPage.propTypes = {};

export default EventPage;
