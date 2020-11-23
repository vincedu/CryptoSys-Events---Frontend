import React from 'react';
import { Card, CardMedia, FormControl, Grid, MenuItem, makeStyles, Select, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    ticketCard: {
        display: 'flex',
        margin: '16px',
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

const CheckoutTicketCard = (props) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const { ticket } = props;
    return (
        <Card className={classes.ticketCard}>
            <Grid container>
                <Grid item container xs={4}>
                    <CardMedia className={classes.ticketImage} image={`https://ipfs.io/ipfs/${ticket.image}`} />
                </Grid>
                <Grid item container direction="row" xs={8}>
                    <Grid item sm={9} xs={12} className={classes.ticketMainContent}>
                        <Typography variant="h6">{ticket.name}</Typography>
                        <Typography variant="body1">
                            {ticket.quantity > 0 ? `${ticket.price} WAX` : t('buyTickets.soldOut')}
                        </Typography>
                        <Typography variant="body2">{ticket.description}</Typography>
                    </Grid>
                    <Grid item container alignContent="center" justify="center" sm={3} xs={4}>
                        <FormControl disabled={ticket.quantity === 0}>
                            <Select
                                variant="outlined"
                                value={ticket.number}
                                onChange={(event) => props.onUpdate(ticket.id, event.target.value)}
                            >
                                {[...Array(ticket.quantity + 1).keys()].map((number) => {
                                    return (
                                        <MenuItem key={number} value={number}>
                                            {number}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

CheckoutTicketCard.propTypes = {
    onUpdate: PropTypes.func.isRequired,
    ticket: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number,
        number: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default CheckoutTicketCard;
