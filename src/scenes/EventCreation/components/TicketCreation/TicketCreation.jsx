import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, makeStyles, useTheme, useMediaQuery, Fab, Hidden } from '@material-ui/core';
import { TitledPaper } from '@components';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Add, Receipt } from '@material-ui/icons';
import CreateTicketDialog from './components/CreateTicketDialog';
import TicketCard from './components/TicketCard';

// TODO: Replace this temp IPFS Hash with real default ticket image IPFS Hash
export const DEFAULT_TICKET_IMAGE_IPFS_HASH = 'QmUSRaUYknQeVKGn3AzrtZuN9UA1aDrPaDP7M4Z1B6ktYS';

// TODO: Uncomment when moving ticket creation to a seperate page
const useStyles = makeStyles((theme) => ({
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

export const TicketCreation = (props) => {
    const { handleNextStep, handleBackStep, tickets, onCreateTicket } = props;
    const { history } = props;
    const { t } = useTranslation();
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

    const handleNextButtonClick = () => {
        handleNextStep();
        history.push({ pathname: '/createEvent/confirm' });
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
                            {isSmallScreen ? (
                                <Fab
                                    className={classes.createTicketFab}
                                    color="secondary"
                                    onClick={handleOpenTicketDialog}
                                >
                                    <Add />
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
                    <Grid container justify="space-between" className={classes.submit}>
                        <Button
                            variant="outlined"
                            className={classes.lowerButton}
                            color="primary"
                            onClick={handleBackStep}
                        >
                            {t('back')}
                        </Button>
                        <Button
                            variant="contained"
                            className={`${classes.lowerButton} ${classes.special}`}
                            color="primary"
                            onClick={handleNextButtonClick}
                        >
                            {t('suivant')}
                        </Button>
                    </Grid>
                </TitledPaper>
            </Grid>
        </Grid>
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
    handleBackStep: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(TicketCreation);
