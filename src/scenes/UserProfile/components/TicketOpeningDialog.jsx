import React, { useState, useContext } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { NFTContext } from '@providers';

const useStyles = makeStyles((theme) => ({
    dialogPaper: {
        background: 'radial-gradient(#6d6d6d, #ffffff);',
    },
    openButton: {},
    dialogContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
        minWidth: '400px',
    },
    dialogActionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 24px',
    },
    ticketView: {
        position: 'relative',
        height: '400px',
        width: '300px',
        transformStyle: 'preserve-3d',
    },
    idleTicketView: {
        animation: '$idleAnimation 2s ease-in-out',
        animationIterationCount: 'infinite',
    },
    openedTicketView: {
        animation: '$openAnimation 2s linear',
        transform: 'rotateY(180deg)',
    },
    frontView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        transform: 'rotateY(180deg)',
        backfaceVisibility: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 40px 4px #ffffff',
    },
    backView: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
        backfaceVisibility: 'hidden',
    },
    ticketImage: {
        maxHeight: '400px',
        maxWidth: '300px',
    },
    revealedTicketImage: {
        animation: '$imageRevealAnimation 2s linear',
        opacity: 1,
    },
    '@keyframes idleAnimation': {
        '0%': {
            transform: 'translateY(0)',
        },
        '40%': {
            transform: 'translateY(-6px)',
        },
        '100%': {
            transform: 'translateY(0)',
        },
    },
    '@keyframes openAnimation': {
        '0%': {
            transform: 'rotateZ(0deg) rotateY(180deg)',
        },
        '10%': {
            transform: 'rotateZ(-10deg) rotateY(0deg)',
        },
        '80%': {
            transform: 'rotateZ(0deg) rotateY(-2160deg)',
        },
        '100%': {
            transform: 'rotateZ(0deg) rotateY(-2340deg)',
        },
    },
    '@keyframes imageRevealAnimation': {
        '0%': {
            opacity: 0,
        },
        '80%': {
            opacity: 0,
        },
        '100%': {
            opacity: 1,
        },
    },
}));

const TicketOpeningDialog = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { t } = useTranslation();
    const isFullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const { setTicketData } = useContext(NFTContext);

    const [isTicketOpen, setIsTicketOpen] = useState(false);

    const ticketClasses = isTicketOpen
        ? `${classes.ticketView} ${classes.openedTicketView}`
        : `${classes.ticketView} ${classes.idleTicketView}`;
    const ticketImageClassses = isTicketOpen
        ? `${classes.ticketImage} ${classes.revealedTicketImage}`
        : classes.ticketImage;

    const { isOpen, onClose, ticket, onTicketOpen } = props;

    const handleOpenTicket = async () => {
        if (!ticket.opened) {
            await setTicketData(ticket.assetId, {
                opened: true,
                used: ticket.used,
            });

            setIsTicketOpen(true);
            onTicketOpen();
        }
    };

    return (
        <Dialog
            onClose={onClose}
            open={isOpen}
            fullScreen={isFullScreen}
            fullWidth
            maxWidth="sm"
            PaperProps={{ className: classes.dialogPaper }}
        >
            <DialogContent className={classes.dialogContent}>
                <div className={ticketClasses}>
                    <div className={classes.frontView}>
                        {ticket.image ? (
                            <img
                                className={ticketImageClassses}
                                alt="ticket front"
                                src={`https://ipfs.io/ipfs/${ticket.image}`}
                            />
                        ) : null}
                    </div>
                    <div className={classes.backView}>
                        <img alt="ticket back" src="/unopened_ticket.png" />
                    </div>
                </div>
            </DialogContent>
            <DialogActions className={classes.dialogActionsContainer}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={handleOpenTicket}
                            disabled={isTicketOpen}
                        >
                            {t('ticketOpening.openButtonLabel')}
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" color="primary" onClick={onClose}>
                            {t('ticketOpening.closeButtonLabel')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

TicketOpeningDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    ticket: PropTypes.object.isRequired,
    onTicketOpen: PropTypes.func.isRequired,
};

export default TicketOpeningDialog;
