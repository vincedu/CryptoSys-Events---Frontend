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
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import moment from 'moment';
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

const EOS_ORANGE = 'rgba(209, 130, 55, 1)';

const EventPage = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const { buyTicketNFTs } = useContext(NFTContext);

    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    // Query Item by ID
    const { data, loading } = useQuery(EVENT_BY_ID_QUERY, { variables: { id } });
    const ticketsQuery = useQuery(TICKET_SALES_BY_EVENT_IDS_QUERY, {
        variables: { eventIds: [id] },
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

    const displayVenue = () => {
        if (data.eventById.location.type === 'venue') {
            return data.eventById.location.location;
        }
        if (data.eventById.location.type === 'tbd') {
            return 'To be announced';
        }
        return data.eventById.location.type;
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
        console.log('RESALE TICKETS', otherTickets);
        return (
            <div style={{ padding: 20 }}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    style={{ backgroundColor: EOS_ORANGE, height: '400px' }}
                >
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
