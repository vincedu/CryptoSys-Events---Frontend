import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, useTheme, useMediaQuery, Button, makeStyles } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import { useTranslation } from 'react-i18next';
import { TitledPaper, PageContainer } from '@components';
import TicketValidationDialog from './components/TicketValidationDialog';

const useStyles = makeStyles((theme) => ({
    button: {
        marginTop: theme.spacing(3),
    },
}));

const QRCodeScanDialog = (props) => {
    const { t } = useTranslation();
    const { open, onClose, eventId } = props;
    const classes = useStyles();
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [scannedData, setScannedData] = useState(undefined);

    const handleScan = (data) => {
        if (data) {
            setScannedData(JSON.parse(data));
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleClose = () => {
        onClose();
    };

    const handleCloseTicketValidationDialog = () => {
        setScannedData(undefined);
    };

    return (
        <Dialog onClose={handleClose} open={open} fullScreen={isFullScreen}>
            <PageContainer>
                <TitledPaper title={t('scanTicket.holdSteady')}>
                    <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
                    <Button fullWidth onClick={onClose} variant="outlined" color="primary" className={classes.button}>
                        {t('close')}
                    </Button>
                    {scannedData ? (
                        <TicketValidationDialog
                            isOpen={Boolean(scannedData)}
                            onClose={handleCloseTicketValidationDialog}
                            scannedData={scannedData}
                            eventId={eventId}
                        />
                    ) : null}
                </TitledPaper>
            </PageContainer>
        </Dialog>
    );
};

QRCodeScanDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    eventId: PropTypes.string.isRequired,
};

export default QRCodeScanDialog;
