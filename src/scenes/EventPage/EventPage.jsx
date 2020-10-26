import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { EVENT_BY_ID_QUERY } from '@graphql/queries';
import { Button, makeStyles, Typography, CircularProgress, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import CheckoutDialog from './components/CheckoutDialog';

const useStyles = makeStyles({
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
});

const DEFAULT_TICKETS = {
    1: {
        id: 1,
        name: 'General',
        description: 'General admission',
        quantity: 20,
        price: 15,
        number: 0,
    },
    2: {
        id: 2,
        name: 'VIP',
        description: 'Access to backstage',
        quantity: 4,
        price: 150,
        number: 0,
    },
};

const EventPage = (props) => {
    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    const handleOpenTicketDialog = () => {
        setIsTicketDialogOpen(true);
    };

    const handleCloseTicketDialog = () => {
        setIsTicketDialogOpen(false);
    };

    const handleBuyTicket = (ticket) => {
        console.log('BUYING', ticket);
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

    // Query Item by ID
    const { data, loading } = useQuery(EVENT_BY_ID_QUERY, { variables: { id: props.location.state.id } });

    if (loading) {
        return <CircularProgress />;
    }

    if (data !== undefined) {
        return (
            <div /* className={classes.imageBackground} */ className={classes.event}>
                <Grid container direction="column" justify="flex-start" alignItems="stretch">
                    <Typography variant="h1">{data.eventById.name}</Typography>
                    <Typography variant="subtitle1">{data.eventById.description}</Typography>
                </Grid>
                <Button variant="contained" color="secondary" onClick={handleOpenTicketDialog}>
                    Buy Tickets
                </Button>
                <CheckoutDialog
                    isOpen={isTicketDialogOpen}
                    onSubmit={handleBuyTicket}
                    onClose={handleCloseTicketDialog}
                    newTickets={DEFAULT_TICKETS}
                    otherTickets={{}}
                    event={{ name: 'Default Event', image: data.eventById.image }}
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
