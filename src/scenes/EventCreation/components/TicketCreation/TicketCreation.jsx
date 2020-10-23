import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@material-ui/core';
import { TitledPaper } from '@components';
import CreateTicketDialog from './components/CreateTicketDialog';
import TicketCard from './components/TicketCard';

// TODO: Replace this temp IPFS Hash with real default ticket image IPFS Hash
export const DEFAULT_TICKET_IMAGE_IPFS_HASH = 'QmUSRaUYknQeVKGn3AzrtZuN9UA1aDrPaDP7M4Z1B6ktYS';

// TODO: Uncomment when moving ticket creation to a seperate page
// const useStyles = makeStyles({
//     createTicketFab: {
//         margin: 0,
//         right: 24,
//         bottom: 24,
//         position: 'fixed',
//     },
// });

export const TicketCreation = (props) => {
    const { tickets, onCreateTicket } = props;

    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

    // TODO: Uncomment when moving ticket creation to a seperate page
    // const classes = useStyles();
    // const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
                    {/* TODO: Uncomment when moving ticket creation to a seperate page
                    {isSmallScreen ? (
                        <Fab className={classes.createTicketFab} color="secondary" onClick={handleOpenTicketDialog}>
                            <AddIcon />
                        </Fab>
                    ) : ( */}
                    <Button variant="contained" color="secondary" onClick={handleOpenTicketDialog}>
                        Create Ticket
                    </Button>
                    {/* )} */}
                </Grid>
            </Grid>
            <CreateTicketDialog
                isOpen={isTicketDialogOpen}
                onSubmit={onCreateTicket}
                onClose={handleCloseTicketDialog}
            />
            <div>
                {tickets.map((ticket) => (
                    <TicketCard
                        key={ticket.name}
                        ticket={ticket}
                        defaultTicketImageUrl={`https://ipfs.io/ipfs/${DEFAULT_TICKET_IMAGE_IPFS_HASH}`}
                    />
                ))}
            </div>
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
};

export default TicketCreation;
