import React, { useState, useContext } from 'react';
import {
    Button,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Tab,
    Tabs,
    Typography,
    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '@providers';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import CheckoutTicketCard from './CheckoutTicketCard';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '0px 0px 0px 0px',
        backgroundColor: theme.palette.background.default,
    },
    rightGrid: { margin: '0px', width: '100%', marginTop: '-20px' },
    createTicketDialogActionsContainer: {
        padding: '16px 24px',
        backgroundColor: theme.palette.background.default,
    },
    eventImageContainer: {
        padding: '0px',
    },
    eventImage: {
        width: '100%',
        height: '50%',
    },
    checkoutTotal: {
        padding: '0px 12px',
    },
    tabs: {
        margin: '',
    },
}));

const CheckoutDialog = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const { t } = useTranslation();

    const { isOpen, onClose, onSubmit, newTickets, otherTickets } = props;
    const [tab, setTab] = React.useState(0);

    const { isUserSignedIn } = useContext(AuthContext);
    const history = useHistory();
    const [signInAlertOpen, setSignInAlertOpen] = useState(false);

    Object.keys(newTickets).forEach((key) => {
        newTickets[key] = { ...newTickets[key], number: 0 };
    });
    Object.keys(otherTickets).forEach((key) => {
        otherTickets[key] = { ...otherTickets[key], number: 0 };
    });
    const [_newTickets, setNewTickets] = useState(newTickets);
    const [_otherTickets, setOtherTickets] = useState(otherTickets);

    const bill = { tickets: [], total: 0 };
    Object.values({ ..._newTickets, ..._otherTickets }).forEach((ticket) => {
        if (ticket.number > 0) {
            bill.tickets.push({ id: ticket.id, name: ticket.name, number: ticket.number, price: ticket.price });
            bill.total += ticket.number * ticket.price;
        }
    });

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleNewTicketUpdate = (name, value) => {
        setNewTickets({ ..._newTickets, [name]: { ..._newTickets[name], number: value } });
    };

    const handleOtherTicketUpdate = (name, value) => {
        setOtherTickets({ ..._otherTickets, [name]: { ..._otherTickets[name], number: value } });
    };

    const handleClose = () => {
        setNewTickets(props.newTickets);
        onClose();
    };

    const handleSignInAlertClose = () => {
        setSignInAlertOpen(false);
    };

    const renderNotSignInAlert = (
        <Dialog open={signInAlertOpen} onClose={handleSignInAlertClose}>
            <DialogTitle>You are not signed in</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You will need to sign in to proceed to checkout. Do you want to sign in now?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSignInAlertClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => history.push('/signIn')} color="primary" autoFocus>
                    Sign In
                </Button>
            </DialogActions>
        </Dialog>
    );

    const handleCheckout = () => {
        if (isUserSignedIn) {
            onSubmit(_newTickets, _otherTickets, bill.total);
            handleClose();
        } else {
            setSignInAlertOpen(true);
        }
    };

    return (
        <div>
            <Dialog onClose={handleClose} open={isOpen} fullScreen={isFullScreen} fullWidth maxWidth="md">
                <DialogContent className={classes.root}>
                    <Grid container spacing={0} className={classes.rightGrid}>
                        <Grid item xs={12} md={8}>
                            <DialogTitle disableTypography>
                                <Typography variant="h4">{props.event.name}</Typography>
                            </DialogTitle>
                            <Tabs
                                value={tab}
                                onChange={handleTabChange}
                                aria-label="simple tabs example"
                                indicatorColor="secondary"
                                textColor="secondary"
                                className={classes.checkoutTotal}
                            >
                                <Tab label={t('buyTickets.newTickets')} />
                                <Tab
                                    label={t('buyTickets.otherVendors')}
                                    disabled={Object.values(_otherTickets).length === 0}
                                />
                            </Tabs>

                            <div hidden={tab !== 0}>
                                {Object.values(_newTickets).map((ticket) => {
                                    return (
                                        <CheckoutTicketCard
                                            key={ticket.id}
                                            ticket={ticket}
                                            onUpdate={handleNewTicketUpdate}
                                        />
                                    );
                                })}
                            </div>
                            <div hidden={tab !== 1}>
                                {Object.values(_otherTickets).map((ticket) => {
                                    return (
                                        <CheckoutTicketCard
                                            key={ticket.id}
                                            ticket={ticket}
                                            onUpdate={handleOtherTicketUpdate}
                                        />
                                    );
                                })}
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <CardMedia className={classes.eventImage} image={props.event.image} />
                            <div className={classes.checkoutTotal}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="space-between"
                                    alignItems="stretch"
                                    spacing={2}
                                >
                                    <Grid item>
                                        <Typography variant="h6">{t('buyTickets.orderSummary')}</Typography>
                                    </Grid>
                                    <Grid item>
                                        {bill.tickets.map((ticket) => {
                                            return (
                                                <Grid key={ticket.id} container spacing={0}>
                                                    <Grid item xs={9}>
                                                        <Typography key={ticket.id} variant="body2">
                                                            {ticket.number} x {ticket.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <Typography key={ticket.id} variant="body2" align="right">
                                                            {(ticket.number * ticket.price).toFixed(2)} WAX
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>

                                    {isEmpty(_newTickets) && isEmpty(_otherTickets) ? (
                                        <div>
                                            <Typography key="ticket.name" variant="body1">
                                                {t('buyTickets.total')} {bill.total.toFixed(2)} WAX
                                            </Typography>
                                        </div>
                                    ) : (
                                        <Grid item>
                                            <Grid container spacing={0}>
                                                <Grid item xs={9}>
                                                    <Typography key="ticket.name" variant="body1">
                                                        {t('buyTickets.total')}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <Typography key="ticket.name" variant="body1" align="right">
                                                        {bill.total.toFixed(2)} WAX
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.createTicketDialogActionsContainer}>
                    <Grid container justify="space-between" spacing={3}>
                        <Grid item md={3} sm={4} xs={6}>
                            <Button fullWidth variant="contained" color="default" onClick={handleClose}>
                                {t('cancel')}
                            </Button>
                        </Grid>
                        <Grid item md={3} sm={4} xs={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                type="submit"
                                onClick={handleCheckout}
                                disabled={bill.tickets.length === 0}
                            >
                                {t('buyTickets.checkout')}
                            </Button>
                            {renderNotSignInAlert}
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </div>
    );
};

CheckoutDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    newTickets: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
    }),
    otherTickets: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
    }).isRequired,
    event: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

CheckoutDialog.defaultProps = {
    newTickets: {},
};

export default CheckoutDialog;
