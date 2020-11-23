import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Dialog, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '400px',
        width: '400px',
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

const TransactionProcessDialog = (props) => {
    const { t } = useTranslation();
    const { open, onClose, failed, onRetry, onCancel } = props;

    const classes = useStyles();
    return (
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={onClose}>
            <div className={classes.dialogContent}>
                {failed ? (
                    <>
                        <Typography variant="overline" className={classes.caption}>
                            {t('processTransactionDialog.transactionFailed')}
                        </Typography>
                        <Button className={classes.button} onClick={onCancel} variant="outlined" color="primary">
                            {t('processTransactionDialog.cancelButtonLabel')}
                        </Button>
                        <Button
                            className={classes.button}
                            onClick={onRetry}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            autoFocus
                        >
                            {t('processTransactionDialog.retryButtonLabel')}
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="overline" className={classes.caption}>
                            {t('processTransactionDialog.processingTransaction')}
                        </Typography>
                        <CircularProgress />
                    </>
                )}
            </div>
        </Dialog>
    );
};

TransactionProcessDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    failed: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default TransactionProcessDialog;
