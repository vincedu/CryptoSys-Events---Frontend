import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Dialog, makeStyles, Typography } from '@material-ui/core';

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
}));

const TransactionProcessDialog = (props) => {
    const { open, onClose } = props;

    const classes = useStyles();
    return (
        <Dialog open={open} onClose={onClose}>
            <div className={classes.dialogContent}>
                <Typography variant="overline" className={classes.caption}>
                    Processing transaction
                </Typography>
                <CircularProgress />
            </div>
        </Dialog>
    );
};

TransactionProcessDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TransactionProcessDialog;
