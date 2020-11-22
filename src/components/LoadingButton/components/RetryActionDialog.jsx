import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';

const RetryActionDialog = (props) => {
    const { t } = useTranslation();
    const { open, onClose, onRetry, onCancel } = props;

    const handleCancel = () => {
        onCancel();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} disableBackdropClick disableEscapeKeyDown>
            <DialogTitle>{t('retryDialog.title')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t('retryDialog.message')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} variant="outlined" color="primary">
                    {t('retryDialog.cancelButtonLabel')}
                </Button>
                <Button onClick={onRetry} variant="contained" color="secondary" type="submit" autoFocus>
                    {t('retryDialog.retryButtonLabel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

RetryActionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onRetry: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default RetryActionDialog;
