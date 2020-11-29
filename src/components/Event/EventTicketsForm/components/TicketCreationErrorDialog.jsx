import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';

const TicketCreationErrorDialog = (props) => {
    const { t } = useTranslation();
    const { open, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{t('createEvent.ticketCreationErrorDialog.title')}</DialogTitle>
            <DialogContent>
                <DialogContentText>{t('createEvent.ticketCreationErrorDialog.message')}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="secondary" type="submit" autoFocus>
                    {t('continue')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

TicketCreationErrorDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TicketCreationErrorDialog;
