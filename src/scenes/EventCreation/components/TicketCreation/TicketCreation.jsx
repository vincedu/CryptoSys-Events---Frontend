import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, makeStyles, useTheme, useMediaQuery, Fab } from '@material-ui/core';
import { TitledPaper } from '@components';
import AddIcon from '@material-ui/icons/Add';
import CreateTicketDialog from './components/CreateTicketDialog';
import TicketCard from './components/TicketCard';

const useStyles = makeStyles({
    createTicketFab: {
        margin: 0,
        right: 24,
        bottom: 24,
        position: 'fixed',
    },
});

const TicketCreation = (props) => {
    const { handleSubmit, tickets, onCreateTicket } = props;

    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpenTicketDialog = () => {
        setIsTicketDialogOpen(true);
    };

    const handleCloseTicketDialog = () => {
        setIsTicketDialogOpen(false);
    };

    return (
        <TitledPaper title="Tickets">
            <Grid container spacing={3}>
                <Grid item md={10} xs={12}>
                    <Typography variant="subtitle2">
                        Create tickets for your event. You can create multiple types of tickets if you want to offer
                        different experiences for your attendees.
                    </Typography>
                </Grid>
                <Grid container item md={2} xs={12} justify="flex-end">
                    {isSmallScreen ? (
                        <Fab className={classes.createTicketFab} color="secondary" onClick={handleOpenTicketDialog}>
                            <AddIcon />
                        </Fab>
                    ) : (
                        <Button variant="contained" color="secondary" onClick={handleOpenTicketDialog}>
                            Create Ticket
                        </Button>
                    )}
                </Grid>
            </Grid>
            <CreateTicketDialog
                isOpen={isTicketDialogOpen}
                onSubmit={onCreateTicket}
                onClose={handleCloseTicketDialog}
            />
            <div>
                {tickets.map((ticket) => (
                    <TicketCard key={ticket.name} ticket={ticket} />
                ))}
            </div>
            <Grid container justify="center" className={classes.submit}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Create Event
                </Button>
            </Grid>
        </TitledPaper>
    );
};

TicketCreation.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            startDate: PropTypes.instanceOf(Date).isRequired,
            endDate: PropTypes.instanceOf(Date).isRequired,
        }),
    ).isRequired,
    onCreateTicket: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default TicketCreation;
