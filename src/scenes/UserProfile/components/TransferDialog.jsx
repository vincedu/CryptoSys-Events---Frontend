import React, { useState } from 'react';
import {
    Button,
    Card,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    TextField,
    Typography,
    makeStyles,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
    },
    rightGrid: { margin: '0px', width: '100%', marginTop: '-20px' },
    dialogActionsContainer: {
        padding: '16px 24px',
        backgroundColor: theme.palette.background.default,
    },
    ticketCard: {
        display: 'flex',
        margin: '16px 0',
    },
    ticketImage: {
        width: '100%',
        height: '100%',
    },
    ticketMainContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
    },
    ticketAdditionalContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
    },
}));

const TransferDialog = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const { t } = useTranslation();

    const [recipient, setRecipient] = useState('');
    const { isOpen, onClose, onSubmit, refetch } = props;

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async () => {
        await onSubmit(recipient);
        await refetch();
        handleClose();
    };

    const handleRecipientChange = (event) => {
        const value = event.target.value;
        setRecipient(value);
    };

    return (
        <Dialog onClose={handleClose} open={isOpen} fullScreen={isFullScreen} fullWidth maxWidth="sm">
            <DialogContent className={classes.root}>
                <Card className={classes.ticketCard}>
                    <Grid container>
                        <Grid item container xs={4}>
                            <CardMedia
                                className={classes.ticketImage}
                                image={`https://ipfs.io/ipfs/${props.ticket.image}`}
                            />
                        </Grid>
                        <Grid item container xs={8}>
                            <Grid item sm={6} xs={6} className={classes.ticketMainContent}>
                                <Typography variant="h6">{props.ticket.name}</Typography>
                                <Typography variant="body2">{props.ticket.description}</Typography>
                            </Grid>
                            {/* <Grid item xs={6} className={classes.ticketAdditionalContent}>
                                <Typography variant="body1">
                                    {t('resale.boughtAt')} WAX {10}
                                </Typography>
                            </Grid> */}
                        </Grid>
                    </Grid>
                </Card>
                <Grid container justify="center">
                    <TextField
                        required
                        fullWidth
                        label={t('ticketList.transferRecipient')}
                        variant="outlined"
                        name="price"
                        onChange={handleRecipientChange}
                    />
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActionsContainer}>
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
                            onClick={handleSubmit}
                            disabled={recipient === ''}
                        >
                            {t('submit')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

TransferDialog.propTypes = {
    refetch: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    ticket: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        // price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
};

export default TransferDialog;
