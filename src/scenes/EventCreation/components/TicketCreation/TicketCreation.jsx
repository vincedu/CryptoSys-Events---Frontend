import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, makeStyles, useTheme, useMediaQuery, Fab } from '@material-ui/core';
import { TitledPaper } from '@components';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import CreateTicketDialog from './components/CreateTicketDialog';
import TicketCard from './components/TicketCard';

// TODO: Replace this temp IPFS Hash with real default ticket image IPFS Hash
export const DEFAULT_TICKET_IMAGE_IPFS_HASH = 'QmUSRaUYknQeVKGn3AzrtZuN9UA1aDrPaDP7M4Z1B6ktYS';

// TODO: Uncomment when moving ticket creation to a seperate page
const useStyles = makeStyles({
    createTicketFab: {
        margin: 0,
        right: 24,
        bottom: 24,
        position: 'fixed',
    },
    button: {
        padding: 15,
        maxHeight: 50,
    },
    submit: {
        paddingTop: 40,
    },
    lowerButton: {
        padding: 15,
        margin: '60px 10px 0 10px',
    },
    special: {
        fontWeight: 900,
    },
});

export const TicketCreation = (props) => {
    const { handleSubmit, tickets, onCreateTicket } = props;
    const { history } = props;
    const { t } = useTranslation();
    const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleBack = () => {
        history.goBack();
    };

    const handleOpenTicketDialog = () => {
        setIsTicketDialogOpen(true);
    };

    const handleCloseTicketDialog = () => {
        setIsTicketDialogOpen(false);
    };

    return (
        <TitledPaper title={t('createEvent.tickets.title')}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Typography variant="body1">{t('createEvent.tickets.description')}</Typography>
                </Grid>
                <Grid container item xs={12} md={4} justify="flex-end">
                    {isSmallScreen ? (
                        <Fab className={classes.createTicketFab} color="secondary" onClick={handleOpenTicketDialog}>
                            <AddIcon />
                        </Fab>
                    ) : (
                        <Button
                            variant="outlined"
                            className={classes.button}
                            color="secondary"
                            onClick={handleOpenTicketDialog}
                        >
                            {t('createEvent.tickets.createTickets')}
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
                    <TicketCard
                        key={ticket.name}
                        ticket={ticket}
                        defaultTicketImageUrl={`https://ipfs.io/ipfs/${DEFAULT_TICKET_IMAGE_IPFS_HASH}`}
                    />
                ))}
            </div>
            <Grid container justify="center" className={classes.submit}>
                <Button variant="outlined" className={classes.lowerButton} color="primary" onClick={handleBack}>
                    {t('back')}
                </Button>
                <Button
                    variant="contained"
                    className={`${classes.lowerButton} ${classes.special}`}
                    color="primary"
                    onClick={handleSubmit}
                >
                    {t('createEvent.tickets.createEvent')}
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
    history: PropTypes.object.isRequired,
};

export default withRouter(TicketCreation);
