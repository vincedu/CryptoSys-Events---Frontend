import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles, Dialog, Grid, Typography } from '@material-ui/core';
import { TitledPaper } from '@components';
import TicketQRCode from './TicketQRCode';

const useStyles = makeStyles({
    ticketImage: {
        margin: 'auto',
        display: 'block',
        maxWidth: '70%',
        maxHeight: '70%',
    },
});

const TicketInfoDialog = (props) => {
    const classes = useStyles();
    const { open, onClose, ticket } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <TitledPaper title={t('ticketList.nftTicketInfo')}>
                <Grid container spacing={2}>
                    <Grid item>
                        <img
                            className={classes.ticketImage}
                            alt="complex"
                            src={`https://ipfs.io/ipfs/${ticket.image}`}
                        />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {ticket.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {ticket.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Asset ID: {ticket.assetId}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">Template ID: {ticket.templateId}</Typography>
                            </Grid>
                        </Grid>
                        {/* <Grid item>
                            <Typography variant="subtitle1">
                                {price.currency} {price.amount}
                            </Typography>
                        </Grid> */}
                    </Grid>
                    <Grid item>
                        <TicketQRCode ticket={ticket} />
                    </Grid>
                </Grid>
            </TitledPaper>
        </Dialog>
    );
};

TicketInfoDialog.propTypes = {
    ticket: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        templateId: PropTypes.string.isRequired,
        eventId: PropTypes.string.isRequired,
        assetId: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number,
        currency: PropTypes.string,
    }),
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
TicketInfoDialog.defaultProps = {
    price: {
        amount: 10,
        currency: 'WAX',
    },
};

export default TicketInfoDialog;
