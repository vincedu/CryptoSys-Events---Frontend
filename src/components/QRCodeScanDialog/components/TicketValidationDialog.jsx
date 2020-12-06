import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { TICKET_BY_ASSET_ID_QUERY } from '@graphql/queries';
import { NFTContext } from '@providers';
import { CenteredCircularProgress } from '@components';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        minWidth: '400px',
    },
    resultIcon: {
        height: '100px',
        width: '100px',
    },
    successIcon: {
        color: theme.palette.success.main,
    },
    caption: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
        width: '160px',
    },
}));

const TicketValidationDialog = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isOpen, onClose, scannedData, eventId } = props;
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const ticketByAssetIdQuery = useQuery(TICKET_BY_ASSET_ID_QUERY, {
        variables: { assetId: scannedData.ticket.assetId },
        fetchPolicy: 'network-only',
    });
    const { setTicketData } = useContext(NFTContext);

    const validateTicket = (scanData, ticketData) => {
        return (
            scanData &&
            scanData.user &&
            scanData.user.walletAccountName === ticketData.owner &&
            scanData.event &&
            scanData.event.id === eventId &&
            !ticketData.used
        );
    };

    const handleCheckIn = async () => {
        try {
            await setTicketData(ticketByAssetIdQuery.data.ticketByAssetId.assetId, {
                opened: ticketByAssetIdQuery.data.ticketByAssetId.opened,
                used: true,
            });
            onClose();
        } catch (error) {
            onClose();
        }
    };

    const renderTicketValidationResult = () => {
        if (ticketByAssetIdQuery.data && ticketByAssetIdQuery.data.ticketByAssetId) {
            if (validateTicket(scannedData, ticketByAssetIdQuery.data.ticketByAssetId)) {
                return (
                    <>
                        <CheckCircleOutlineIcon
                            className={`${classes.resultIcon} ${classes.successIcon}`}
                            color="success"
                        />
                        <Typography variant="overline" className={classes.caption}>
                            {t('ticketValidationDialog.validTicket')}
                        </Typography>
                        <Button
                            className={classes.button}
                            onClick={handleCheckIn}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            autoFocus
                        >
                            {t('ticketValidationDialog.checkIn')}
                        </Button>
                    </>
                );
            }
            return (
                <>
                    <HighlightOffIcon className={classes.resultIcon} color="error" />
                    <Typography variant="overline" className={classes.caption}>
                        {t('ticketValidationDialog.invalidTicket')}
                    </Typography>
                </>
            );
        }

        return <CenteredCircularProgress />;
    };

    return (
        <Dialog onClose={onClose} open={isOpen} fullScreen={isFullScreen} disableBackdropClick disableEscapeKeyDown>
            <div className={classes.dialogContent}>
                {renderTicketValidationResult()}
                <Button className={classes.button} onClick={onClose} variant="outlined" color="primary">
                    {t('close')}
                </Button>
            </div>
        </Dialog>
    );
};

TicketValidationDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    scannedData: PropTypes.object.isRequired,
    eventId: PropTypes.string.isRequired,
};

export default TicketValidationDialog;
