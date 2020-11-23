import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import { TitledPaper, PageContainer } from '@components';
import { useTranslation } from 'react-i18next';

const QRCodeScanDialog = (props) => {
    const { t } = useTranslation();
    const [result, setresult] = useState(t('scanTicket.noResult'));
    const { open, onClose } = props;

    const handleScan = (data) => {
        if (data) {
            setresult(data);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <PageContainer>
                <TitledPaper title={t('scanTicket.holdSteady')}>
                    <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: '100%' }} />
                    <p>
                        {t('scanTicket.scanResult')}: {result}
                    </p>
                </TitledPaper>
            </PageContainer>
        </Dialog>
    );
};

QRCodeScanDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default QRCodeScanDialog;
