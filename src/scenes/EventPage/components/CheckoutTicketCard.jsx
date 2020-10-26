import React from 'react';
import { Card, CardMedia, Grid, MenuItem, makeStyles, Select, Typography } from '@material-ui/core';
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

const TicketCard = (props) => {
    const classes = useStyles();
    const { ticket } = props;
    return (
        <Card className={classes.ticketCard}>
            <Grid container>
                <Grid item container xs={4}>
                    <CardMedia className={classes.ticketImage} image={ticket.image} />
                </Grid>
                <Grid item container direction="row" xs={8}>
                    <Grid item sm={9} xs={12} className={classes.ticketMainContent}>
                        <Typography variant="h6">{ticket.name}</Typography>
                        <Typography variant="body1">${ticket.price}</Typography>
                        <Typography variant="body2">{ticket.description}</Typography>
                    </Grid>
                    <Grid item container alignContent="center" justify="center" sm={3} xs={4}>
                        <Select
                            variant="outlined"
                            value={ticket.number}
                            onChange={(event) => props.onUpdate(props.ticket.id, event.target.value)}
                        >
                            {[...Array(props.ticket.quantity + 1).keys()].map((number) => {
                                return (
                                    <MenuItem key={number} value={number}>
                                        {number}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
};

TicketCard.propTypes = {
    onUpdate: PropTypes.func.isRequired,
    ticket: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        // soldQuantity: PropTypes.number,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        number: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default TicketCard;
