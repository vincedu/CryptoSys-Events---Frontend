import React, { useState } from 'react';
import { Button, Fab, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { TitledPaper } from '../../../components/TitledPaper';
import CreateTicketDialog from './CreateTicketDialog';
import TicketCard from './TicketCard';

const useStyles = makeStyles({
    createTicketFab: {
        margin: 0,
        right: 24,
        bottom: 24,
        position: 'fixed',
    },
});

const TicketCreation = () => {
    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    const [tickets, setTickets] = useState([]);

    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleOpenTicketDialog = () => {
        setIsTicketDialogOpen(true);
    };

    const handleCloseTicketDialog = () => {
        setIsTicketDialogOpen(false);
    };

    const handleCreateTicket = (ticketData) => {
        setTickets([...tickets, ticketData]);
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
                            Create
                        </Button>
                    )}
                </Grid>
            </Grid>
            <CreateTicketDialog
                isOpen={isTicketDialogOpen}
                onSubmit={handleCreateTicket}
                onClose={handleCloseTicketDialog}
            />
            <div>
                {tickets.map((ticket) => (
                    <TicketCard ticket={ticket} />
                ))}
            </div>
        </TitledPaper>
    );
};

export default TicketCreation;
