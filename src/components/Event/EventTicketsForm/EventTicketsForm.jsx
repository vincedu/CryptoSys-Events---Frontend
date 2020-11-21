import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, makeStyles, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Receipt } from '@material-ui/icons';
import { TitledPaper } from '@components';
import { DEFAULT_TICKET_IMAGE_IPFS_HASH } from '@constants';
import CreateTicketDialog from './components/CreateTicketDialog';
import TicketCard from './components/TicketCard';

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
    const { tickets, onCreateTicket } = props;
    const { t } = useTranslation();
    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    const classes = useStyles();

    const handleOpenTicketDialog = () => {
        setIsTicketDialogOpen(true);
    };

    const handleCloseTicketDialog = () => {
        setIsTicketDialogOpen(false);
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
            currency: PropTypes.string.isRequired,
            originalSoldCount: PropTypes.number,
        }),
    ).isRequired,
    onCreateTicket: PropTypes.func.isRequired,
};

export default EventTicketsForm;
