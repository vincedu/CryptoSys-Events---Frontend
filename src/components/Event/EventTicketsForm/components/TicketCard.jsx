import React from 'react';
import { Card, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    ticketCard: {
        display: 'flex',
        margin: '16px 0',
    },
    ticketImage: {
        width: '100%',
        height: '100%',
    },
    ticketMainContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
    },
    ticketAdditionalContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
    },
});

const TicketCard = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { ticket, defaultTicketImageUrl } = props;

    const ticketImageUrl = ticket.image ? URL.createObjectURL(ticket.image) : defaultTicketImageUrl;

    return (
        <Card className={classes.ticketCard}>
            <Grid container>
                <Grid item container xs={4}>
                    <CardMedia className={classes.ticketImage} image={ticketImageUrl} />
                </Grid>
                <Grid item container xs={8}>
                    <Grid item md={6} xs={12} className={classes.ticketMainContent}>
                        <Typography variant="h6">{ticket.name}</Typography>
                        <Typography variant="body2">{ticket.description}</Typography>
                    </Grid>
                    <Grid item container md={6} xs={12}>
                        <Grid item xs={6} className={classes.ticketAdditionalContent}>
                            <Typography variant="body1">{`${ticket.quantity} ${t(
                                'createEvent.tickets.units',
                            )}`}</Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.ticketAdditionalContent}>
                            <Typography variant="body1">{ticket.price ? `WAX ${ticket.price}` : '-'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

TicketCard.propTypes = {
    ticket: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        startDate: PropTypes.instanceOf(Date).isRequired,
        endDate: PropTypes.instanceOf(Date).isRequired,
        soldQuantity: PropTypes.number,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.object,
    }).isRequired,
    defaultTicketImageUrl: PropTypes.string.isRequired,
};

export default TicketCard;
