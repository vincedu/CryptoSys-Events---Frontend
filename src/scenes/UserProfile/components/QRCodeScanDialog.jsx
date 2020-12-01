import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import { useTranslation } from 'react-i18next';
import { TitledPaper, PageContainer } from '@components';
import TicketValidationDialog from './TicketValidationDialog';

const QRCodeScanDialog = (props) => {
    const { t } = useTranslation();
    const { open, onClose, eventId } = props;

    const [scannedData, setScannedData] = useState(undefined);

    const handleScan = (data) => {
        if (data) {
            console.log(data);
            setScannedData(data);
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
        <Dialog onClose={handleClose} open={open}>
            <PageContainer>
                <TitledPaper title={t('scanTicket.holdSteady')}>
                    <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
                    {/* <p>
                        {t('scanTicket.scanResult')}: {result}
                    </p> */}
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
