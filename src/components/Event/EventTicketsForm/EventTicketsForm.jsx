import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, makeStyles, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Receipt } from '@material-ui/icons';
import { TitledPaper } from '@components';
import { DEFAULT_TICKET_IMAGE_IPFS_HASH } from '@constants';
import CreateTicketDialog from './components/CreateTicketDialog';
import TicketCard from './components/TicketCard';
import TicketCreationProcessDialog from './components/TicketCreationProcessDialog';
import TicketCreationErrorDialog from './components/TicketCreationErrorDialog';

const useStyles = makeStyles((theme) => ({
    button: {
        padding: 15,
        maxHeight: 50,
    },
    submit: {
        paddingTop: 40,
    },
    icon: {
        fontSize: '5em',
        textAlign: 'right',
        [theme.breakpoints.down('sm')]: {
            fontSize: '3em',
        },
    },
    iconGrid: {
        paddingTop: '20px',
        color: 'lightgrey',
    },
}));

export const EventTicketsForm = (props) => {
    const { tickets, onCreateTicket, eventId } = props;
    const { t } = useTranslation();
    const classes = useStyles();
    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    const [currentTicket, setCurrentTicket] = useState(undefined);
    const [isShowingErrorDialog, setIsShowingErrorDialog] = useState(false);

    const handleOpenTicketDialog = () => {
        setIsTicketDialogOpen(true);
    };

    const handleCloseTicketDialog = () => {
        setIsTicketDialogOpen(false);
    };

    const handleInitiliazeCreateTicket = (ticket) => {
        setCurrentTicket(ticket);
    };

    const handleFinishCreateTicket = () => {
        onCreateTicket(currentTicket);
        setCurrentTicket(undefined);
    };

    const handleCreateTicketError = () => {
        setIsShowingErrorDialog(true);
        setCurrentTicket(undefined);
    };

    return (
        <Grid container justify="center">
            <Hidden smDown>
                <Grid item md={1} className={classes.iconGrid}>
                    <Receipt className={classes.icon} />
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={11} md={9} className={classes.noPaddingLeft}>
                <TitledPaper title={t('createEvent.tickets.title')}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <Typography variant="body1">{t('createEvent.tickets.description')}</Typography>
                        </Grid>
                        <Grid container item xs={12} md={3} justify="flex-end">
                            <Button
                                variant="outlined"
                                className={classes.button}
                                color="secondary"
                                onClick={handleOpenTicketDialog}
                            >
                                {t('createEvent.tickets.createTickets')}
                            </Button>
                        </Grid>
                    </Grid>
                    <CreateTicketDialog
                        isOpen={isTicketDialogOpen}
                        onSubmit={handleInitiliazeCreateTicket}
                        onClose={handleCloseTicketDialog}
                    />
                    {currentTicket ? (
                        <TicketCreationProcessDialog
                            isOpen={Boolean(currentTicket)}
                            onClose={() => setCurrentTicket(undefined)}
                            onCancel={handleCreateTicketError}
                            onFinish={handleFinishCreateTicket}
                            ticket={currentTicket}
                            eventId={eventId}
                        />
                    ) : null}
                    <TicketCreationErrorDialog
                        open={isShowingErrorDialog}
                        onClose={() => setIsShowingErrorDialog(false)}
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
            </Grid>
        </Grid>
    );
};

EventTicketsForm.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            image: PropTypes.object,
            quantity: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            currency: PropTypes.string,
            originalSoldCount: PropTypes.number,
        }),
    ).isRequired,
    onCreateTicket: PropTypes.func.isRequired,
    eventId: PropTypes.func.isRequired,
};

export default EventTicketsForm;
