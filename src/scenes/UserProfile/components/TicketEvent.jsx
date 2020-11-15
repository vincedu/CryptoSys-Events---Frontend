import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    makeStyles,
    CardMedia,
    Typography,
    Grid,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import MyTicketItem from './MyTicketItem';
import SellTicketItem from './SellTicketItem';

const DATE_FORMAT = 'YYYY-MM-DD, h:mma';

const useStyles = makeStyles((theme) => ({
    ticketEvent: {
        margin: '32px 0',
    },
    ticketItem: {
        display: 'block',
    },
    eventImage: {
        width: '100%',
        height: '100%',
    },
    eventContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
    },
    banner: {
        minWidth: 40,
        height: 35,
        borderRadius: 2,
        position: 'absolute',
        top: 30,
        left: 0,
        zIndex: 3,
    },
    bannerContent: {
        backgroundColor: theme.palette.secondary.main,
        opacity: 0.7,
        textAlign: 'center',
        padding: 10,
        color: '#fff',
        fontWeight: 500,
    },
}));

const getTicketsQuantity = (eventTickets) => {
    let ticketsQuantity = 0;
    eventTickets.tickets.forEach((eventTicketType) => {
        ticketsQuantity += eventTicketType.tickets.length;
    });
    return ticketsQuantity;
};

const TicketEvent = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { eventTickets, forSale } = props;
    const ticketsQuantity = getTicketsQuantity(eventTickets);

    return (
        <Accordion className={classes.ticketEvent}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Grid item xs={12} sm={6} md={3}>
                    <div className={classes.banner}>
                        <Paper className={classes.bannerContent}>
                            <p style={{ margin: 'auto' }}>
                                {ticketsQuantity}{' '}
                                {ticketsQuantity < 2 ? t('ticketList.ticket') : t('ticketList.tickets')}
                            </p>
                        </Paper>
                    </div>
                    <CardMedia className={classes.eventImage} image={eventTickets.event.image} />
                </Grid>
                <Grid item xs={12} sm={6} md={9} className={classes.eventContent}>
                    <Typography variant="h5">{eventTickets.event.name}</Typography>
                    <Typography variant="body2">{eventTickets.event.description}</Typography>
                    <Typography variant="overline">
                        {moment(eventTickets.event.startDate).format(DATE_FORMAT)}
                    </Typography>
                </Grid>
            </AccordionSummary>

            <AccordionDetails className={classes.ticketItem}>
                <div>
                    {eventTickets.tickets.map((eventTicketsType) =>
                        eventTicketsType.tickets.map((ticket) =>
                            forSale ? (
                                <SellTicketItem
                                    key={ticket.assetId}
                                    name={eventTicketsType.template.name}
                                    description={eventTicketsType.template.description}
                                    image={eventTicketsType.template.image}
                                    templateId={eventTicketsType.template.templateId}
                                    assetId={ticket.assetId}
                                    sale={ticket.sale}
                                />
                            ) : (
                                <MyTicketItem
                                    key={ticket.assetId}
                                    name={eventTicketsType.template.name}
                                    description={eventTicketsType.template.description}
                                    image={eventTicketsType.template.image}
                                    templateId={eventTicketsType.template.templateId}
                                    assetId={ticket.assetId}
                                    opened={ticket.opened}
                                    used={ticket.used}
                                />
                            ),
                        ),
                    )}
                </div>
            </AccordionDetails>
        </Accordion>
    );
};

TicketEvent.propTypes = {
    eventTickets: PropTypes.object.isRequired,
    forSale: PropTypes.bool,
};
TicketEvent.defaultProps = {
    forSale: false,
};

export default TicketEvent;
