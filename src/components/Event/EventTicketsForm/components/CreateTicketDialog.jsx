import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    InputAdornment,
    makeStyles,
    TextField,
    useMediaQuery,
    useTheme,
    Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ImageUpload } from '@components';
import { Autocomplete } from '@material-ui/lab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { TICKET_NAME_SUGGESTIONS } from '@constants/';

const DEFAULT_TICKET_FORM = {
    name: {
        value: '',
        error: false,
    },
    description: {
        value: '',
        error: false,
    },
    quantity: {
        value: '',
        error: false,
    },
    price: {
        value: '',
        error: false,
    },
    image: {
        value: undefined,
        error: false,
    },
};

const DEFAULT_TICKET_DATE = {
    start: new Date(),
    end: new Date(),
    error: false,
};

const useStyles = makeStyles((theme) => ({
    createTicketDialogActionsContainer: {
        padding: '16px 24px',
    },
    datePickersContainer: {
        maxWidth: 'none',
    },
    button: {
        backgroundColor: `${theme.palette.primary.main} !important`,
        borderRadius: '3px !important',
    },
    title: {
        padding: '16px 24px 0 24px',
    },
}));

const CreateTicketDialog = (props) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { isOpen, onClose, onSubmit } = props;

    const [form, setForm] = useState(DEFAULT_TICKET_FORM);
    const [date, setDate] = useState(DEFAULT_TICKET_DATE);
    const theme = useTheme();
    const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const isValueValid = (value) => {
        return value !== '';
    };

    const areDatesValid = () => {
        return date.start <= date.end;
    };

    const isFormValid = () => {
        let isValid = true;

        Object.values(form).forEach((value) => {
            if (value.error || value.value === '') {
                isValid = false;
            }
        });
        if (!areDatesValid()) {
            isValid = false;
        }
        return isValid;
    };

    const updateFormErrors = () => {
        const updatedForm = {};
        Object.keys(form).forEach((key) => {
            updatedForm[key] = {
                value: form[key].value,
                error: !isValueValid(form[key].value),
            };
        });
        setForm(updatedForm);
        setDate({ ...date, error: !areDatesValid() });
    };

    const mapFormToTicket = () => {
        const ticket = {};
        Object.keys(form).forEach((key) => {
            ticket[key] = form[key].value;
        });
        ticket.startDate = date.start;
        ticket.endDate = date.end;

        return ticket;
    };

    const handleClose = () => {
        setForm(DEFAULT_TICKET_FORM);
        onClose();
    };

    const handleCreateTicket = () => {
        if (isFormValid()) {
            onSubmit(mapFormToTicket());
            handleClose();
        } else {
            updateFormErrors();
        }
    };

    const handleFormChange = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        const inputType = event.target.type;

        let parsedValue;
        switch (inputType) {
            case 'number':
                if (isValueValid(inputValue)) {
                    parsedValue = inputName === 'price' ? parseFloat(inputValue) : parseInt(inputValue, 10);
                } else {
                    parsedValue = '';
                }
                break;
            default:
                parsedValue = inputValue;
        }

        setForm({
            ...form,
            [inputName]: {
                value: parsedValue,
                error: !isValueValid(inputValue),
            },
        });
    };

    const handleImageUpload = async (image) => {
        setForm({
            ...form,
            image: {
                value: image,
                error: form.image.error,
            },
        });
    };

    const handleNameChange = (_, newName) => {
        setForm({
            ...form,
            name: {
                value: newName || '',
                error: !isValueValid(newName),
            },
        });
    };

    return (
        <Dialog onClose={handleClose} open={isOpen} fullScreen={isFullScreen}>
            <Typography variant="h4" className={classes.title}>
                {t('createEvent.tickets.createTicket')}
            </Typography>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ImageUpload value={form.image.value} onChange={handleImageUpload} />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            freeSolo
                            autoSelect
                            fullWidth
                            options={TICKET_NAME_SUGGESTIONS}
                            getOptionLabel={(option) => option}
                            name="name"
                            value={form.name.value}
                            onChange={handleNameChange}
                            popupIcon={<ArrowDropDownIcon color="primary" />}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label={t('createEvent.tickets.ticketName')}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    error={form.name.error}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            multiline
                            rows={4}
                            label={t('createEvent.tickets.ticketDescription')}
                            variant="outlined"
                            name="description"
                            value={form.description.value}
                            error={form.description.error}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label={t('createEvent.tickets.quantity')}
                            variant="outlined"
                            type="number"
                            name="quantity"
                            value={form.quantity.value}
                            error={form.quantity.error}
                            onChange={handleFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            required
                            label={t('createEvent.tickets.unitPrice')}
                            variant="outlined"
                            type="number"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">WAX</InputAdornment>,
                            }}
                            name="price"
                            value={form.price.value}
                            error={form.price.error}
                            onChange={handleFormChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions className={classes.createTicketDialogActionsContainer}>
                <Grid container justify="space-between" spacing={3}>
                    <Grid item sm={3} xs={12}>
                        <Button fullWidth variant="outlined" color="primary" onClick={handleClose}>
                            {t('cancel')}
                        </Button>
                    </Grid>
                    <Grid item sm={3} xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            type="submit"
                            style={{ fontWeight: 900 }}
                            onClick={handleCreateTicket}
                        >
                            {t('create')}
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

CreateTicketDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default CreateTicketDialog;
